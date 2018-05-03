import {RSAA} from "redux-api-middleware";
import {pendingTask, begin, end, endAll} from 'react-redux-spinner';

import {STATUS_SUCCESS, STATUS_ERROR, NOTIFICATION} from "../Notification/actions";

export const EVENTS_REQUEST = 'boilerplate/app/EVENTS_REQUEST';
export const EVENTS_RECEIVE = 'boilerplate/app/EVENTS_RECEIVE';
export const EVENTS_FAILURE = 'boilerplate/app/EVENTS_FAILURE';

export const listEvents = (username, nextPageUrl) => {
    return (dispatch, getState) => {
        const account = getState().settings.account;
        if (!account.url || !account.token) {
            return;
        }
        const events = getState().events;
        if (!nextPageUrl && events && events.items && events.items.length > 0) {
            return;
        }

        const url = nextPageUrl || 'https://' + account.url + '/users/' + username + '/events';
        dispatch(fetchEvents(url, account.token));
    };
};

const fetchEvents = (url, token) => {
    return async(dispatch, getState) => {
        const actionResponse = await dispatch({
            [RSAA]: {
                endpoint: url,
                method: "GET",
                headers: {
                    'Authorization': 'token ' + token,
                    'Accept': 'application/vnd.github.html+json',
                    'Content-Type': 'application/json'
                },
                types: [
                    {
                        type: EVENTS_REQUEST,
                        meta: {
                            [pendingTask]: begin
                        }
                    }, {
                        type: EVENTS_RECEIVE,
                        meta: (action, state, res) => {
                            return {
                                [pendingTask]: end,
                                [NOTIFICATION]: {status: STATUS_SUCCESS, message: "DONE!"},
                                receivedAt: Date.now(),
                                nextPageUrl: getNextPageUrl(res)
                            }
                        }
                    }, {
                        type: EVENTS_FAILURE,
                        meta: (action, state, res) => {
                            return {
                                [pendingTask]: endAll,
                                [NOTIFICATION]: {status: STATUS_ERROR, message: res.statusText},
                            }
                        }
                    }]
            }
        });

        if (actionResponse.error) {
            dispatch({
                type: EVENTS_FAILURE,
                meta: {
                    [pendingTask]: endAll,
                    [NOTIFICATION]:{status: STATUS_ERROR, message: actionResponse.payload.message},
                },
            });
        }

        return actionResponse;
    }
};

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
    const link = response.headers.get('link');
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
    if (!nextLink) {
        return null
    }

    return nextLink.trim().split(';')[0].slice(1, -1)
};
