import {notifyMessage} from "./app";
import {saveAccount} from "./settings";

export const USER_REQUEST = 'boilerplate/app/USER_REQUEST';
export const USER_RECEIVE = 'boilerplate/app/USER_RECEIVE';

export const GUEST_USER = {
    avatar_url: 'images/guest.png',
    name: 'Guest',
    login: '',
    url: '',
};

const reducer = (state = {user: GUEST_USER, isFetching: false}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case USER_RECEIVE:
            return {
                ...state,
                user: action.user,
                lastUpdated: action.receivedAt,
                isFetching: false
            };
        default:
            return state;
    }
};
export default reducer;

export const requestUser = () => ({ type: USER_REQUEST });
export const receiveUser = user => ({ type: USER_RECEIVE, receivedAt: Date.now(), user });

export const requestLogin = () => {
    return (dispatch, getState) => {
        const account = getState().settings.account;
        if (!account.url || !account.token) {
            return;
        }
        dispatch(notifyMessage({status: "START", message: "", notifiedAt: Date.now()}));
        dispatch(requestUser());
        return fetch('https://' + account.url + '/user', {
            headers: {
                'Authorization': 'token ' + account.token,
                'Accept': 'application/vnd.github.html+json',
                'Content-Type': 'application/json'
            }
        })
            .then(response =>
                    response.json().then(json => {
                        if (!response.ok) {
                            dispatch(notifyMessage({status: "ERROR", message: json.message, notifiedAt: Date.now()}));
                            return dispatch(receiveUser(GUEST_USER))
                        }

                        dispatch(notifyMessage({status: "SUCCESS", message: "Welcome " + json.name, notifiedAt: Date.now()}));
                        account.login = json.login;
                        saveAccount(account);
                        return dispatch(receiveUser(json))
                    }),
                error => {
                    dispatch(notifyMessage({status: "ERROR", message: error.message, notifiedAt: Date.now()}))
                }
            );
    }
};

export const requestLogout = () => {
    return dispatch => {
        dispatch(receiveUser(GUEST_USER));
    }
};
