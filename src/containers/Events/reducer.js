import {ACTION_MESSAGE, notifyMessage} from "../Indicator/actions";
import {CALL_API} from "redux-api-middleware";
import {TASK_START, TASK_SUCCESS, TASK_ERROR, TASK_CLEAR, ACTION_KEY} from "../Indicator/reducer";

export const EVENTS_REQUEST = 'boilerplate/app/EVENTS_REQUEST';
export const EVENTS_RECEIVE = 'boilerplate/app/EVENTS_RECEIVE';
export const EVENTS_FAILURE = 'boilerplate/app/EVENTS_FAILURE';

const reducer = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFail: false,
            };
        case EVENTS_RECEIVE:
            return {
                ...state,
                items: state.items.concat(action.payload),
                nextPageUrl: action.nextPageUrl,
                isFetching: true,
                isFail: false,
            };
        case EVENTS_FAILURE:
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
        dispatch(notifyMessage({status: "START", message: "", notifiedAt: Date.now()}));

        const url = nextPageUrl || 'https://' + account.url + '/users/' + username + '/events';
        dispatch(fetchEvents(url, account.token));
    };
};

const fetchEvents = (url, token) => {
    return {
        [CALL_API]: {
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
                        [ACTION_KEY]: TASK_START
                    }
                }, {
                    type: EVENTS_RECEIVE,
                    meta: {
                        [ACTION_KEY]: TASK_SUCCESS,
                        receivedAt: Date.now()
                    }
                }, {
                    type: EVENTS_FAILURE,
                    meta: (action, state, res) => {
                        return {
                            [ACTION_KEY]: TASK_ERROR,
                            [ACTION_MESSAGE]: (res && res.statusText) || "Error"
                        }
                    }
                }]
        }
    }
};

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.split(';')[0].slice(1, -1)
};
