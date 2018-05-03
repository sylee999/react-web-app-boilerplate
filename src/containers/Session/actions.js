import {RSAA} from "redux-api-middleware";
import { pendingTask, begin, end, endAll } from 'react-redux-spinner';
import {NOTIFICATION, STATUS_ERROR, STATUS_SUCCESS} from "../Notification/actions";

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
    return async(dispatch, getState) => {
        const actionResponse = await dispatch({
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
                            [pendingTask]: begin
                        }
                    }, {
                        type: USER_RECEIVE,
                        meta: {
                            [pendingTask]: end,
                            [NOTIFICATION]: {status: STATUS_SUCCESS, message: "DONE!"},
                            receivedAt: Date.now()
                        },
                    }, {
                        type: USER_FAILURE,
                        meta: {
                            [pendingTask]: endAll,
                            [NOTIFICATION]: {status: STATUS_SUCCESS, message: "DONE!"},
                        },
                    }]
            }
        });

        if (actionResponse.error) {
            dispatch({
                type: USER_FAILURE,
                meta: {
                    [pendingTask]: endAll,
                    [NOTIFICATION]: {status: STATUS_ERROR, message: actionResponse.payload.message},
                },
            });
        }

        return actionResponse;
    };
};
