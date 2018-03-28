import {CALL_API, getJSON} from "redux-api-middleware";
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

export const receiveUser = user => ({ type: USER_RECEIVE, receivedAt: Date.now(), user });

export const login = (account) => {
    return (dispatch) => {
        if (!account || !account.url || !account.token) {
            return;
        }
        dispatch(fetchUser(account, dispatch));
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(receiveUser(GUEST_USER));
    }
};

const fetchUser = (account, dispatch) => {
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
                    }
                }]
        }
    };
};
