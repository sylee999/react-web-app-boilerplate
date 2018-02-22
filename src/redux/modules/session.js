import {CALL_API} from "redux-api-middleware";
import {notifyMessage} from "./app";
import {saveAccount} from "./settings";
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
    endAll // The action value if all running tasks must end
} from 'react-redux-spinner';

export const USER_REQUEST = 'boilerplate/app/USER_REQUEST';
export const USER_RECEIVE = 'boilerplate/app/USER_RECEIVE';
export const USER_FAILURE = 'boilerplate/app/USER_FAILURE';

export const GUEST_USER = {
    avatar_url: 'images/guest.png',
    name: 'Guest',
    login: '',
    url: '',
};

const reducer = (state = {user: GUEST_USER, isFail: false, isFetching: false}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFail: false,
            };
        case USER_RECEIVE:
            return {
                ...state,
                user: action.payload,
                lastUpdated: action.meta.receivedAt,
                isFetching: false,
                isFail: false,
            };
        case USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFail: true,
            };
        default:
            return state;
    }
};
export default reducer;

export const receiveUser = user => ({ type: USER_RECEIVE, receivedAt: Date.now(), user });

export const login = (account) => {
    return (dispatch) => {
        if (!account || !account.url || !account.token) {
            return;
        }
        dispatch(fetchUser(account));
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(receiveUser(GUEST_USER));
    }
};

const fetchUser = (account) => {
    return {
        [CALL_API]: {
            endpoint: 'https://' + account.url + '/user',
            method: "GET",
            headers: {
                'Authorization': 'token ' + account.token,
                'Accept': 'application/vnd.github.html+json',
                'Content-Type': 'application/json'
            },
            types: [
                {
                    type: USER_REQUEST,
                    meta: {
                        [ pendingTask ]: begin
                    }
                }, {
                    type: USER_RECEIVE,
                    meta: {
                        [ pendingTask ]: end,
                        receivedAt: Date.now()
                    }
                }, {
                    type: USER_FAILURE,
                    meta: {
                        [ pendingTask ]: endAll
                    }
                }]
        }
    };
};

// export const login = () => {
//     return (dispatch, getState) => {
//         const account = getState().settings.account;
//         if (!account.url || !account.token) {
//             return;
//         }
//         dispatch(notifyMessage({status: "START", message: "", notifiedAt: Date.now()}));
//         dispatch(requestUser());
//         return fetch('https://' + account.url + '/user', {
//             headers: {
//                 'Authorization': 'token ' + account.token,
//                 'Accept': 'application/vnd.github.html+json',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response =>
//                     response.json().then(json => {
//                         if (!response.ok) {
//                             dispatch(notifyMessage({status: "ERROR", message: json.message, notifiedAt: Date.now()}));
//                             return dispatch(receiveUser(GUEST_USER))
//                         }
//
//                         dispatch(notifyMessage({status: "SUCCESS", message: "Welcome " + json.name, notifiedAt: Date.now()}));
//                         account.login = json.login;
//                         saveAccount(account);
//                         dispatch(receiveUser(json))
//                     }),
//                 error => {
//                     dispatch(notifyMessage({status: "ERROR", message: error.message, notifiedAt: Date.now()}))
//                     dispatch(receiveUser(GUEST_USER))
//                 }
//             );
//     }
// };

