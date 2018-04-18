import {RSAA} from "redux-api-middleware";
import { pendingTask, begin, end, endAll } from 'react-redux-spinner';
import {notifyMessage, STATUS_ERROR, STATUS_SUCCESS} from "../Notification/actions";

export const USER_REQUEST = 'boilerplate/app/USER_REQUEST';
export const USER_RECEIVE = 'boilerplate/app/USER_RECEIVE';
export const USER_FAILURE = 'boilerplate/app/USER_FAILURE';

export const GUEST_USER = {
    avatar_url: 'images/guest.png',
    name: 'Guest',
    login: '',
    url: '',
};

export const receiveUser = user => ({
    type: USER_RECEIVE,
    payload: {user},
    meta: {
        receivedAt: Date.now(),
    }
});

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
    return (dispatch, getState) => {
        return dispatch({
            [RSAA]: {
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
                            [ pendingTask  ]: begin
                        }
                    }, {
                        type: USER_RECEIVE,
                        meta: (action, state, res) => {
                            dispatch(notifyMessage({status:STATUS_SUCCESS, message: "Login success!" }));
                            return {
                                [pendingTask]: end,
                                receivedAt: Date.now()
                            }
                        }
                    }, {
                        type: USER_FAILURE,
                        meta: (action, state, res) => {
                            dispatch(notifyMessage({status:STATUS_ERROR, message: res.statusText }));
                            return {
                                [pendingTask]: endAll,
                            }
                        },
                    }]
            }
        }).then(actionResponse => {
            if (actionResponse.error) {
                dispatch(notifyMessage({status: STATUS_ERROR, message: actionResponse.payload.message}));
                dispatch({
                    type: USER_FAILURE,
                    meta: {
                        [pendingTask]: endAll
                    },
                });
            }

            return actionResponse;
        });
    };
};
