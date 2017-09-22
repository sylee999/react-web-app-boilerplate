import {notifyMessage} from "./app";

export const EVENTS_REQUEST = 'boilerplate/app/EVENTS_REQUEST';
export const EVENTS_RECEIVE = 'boilerplate/app/EVENTS_RECEIVE';

const reducer = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case EVENTS_RECEIVE:
            return {
                ...state,
                items: state.items.concat(action.items),
                nextPageUrl: action.nextPageUrl,
                isFetching: true
            };
        default:
            return state;
    }
};
export default reducer;

export const requestEvents = () => ({type: EVENTS_REQUEST});
export const receiveEvents = (items, nextPageUrl) => ({type: EVENTS_RECEIVE, nextPageUrl: nextPageUrl, receivedAt: Date.now(), items});

export const fetchEvents = (username, nextPageUrl) => {
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
        dispatch(requestEvents());
        return fetch(nextPageUrl || 'https://' + account.url + '/users/' + username + '/events', {
            headers: {
                'Authorization': 'token ' + account.token,
                'Accept': 'application/vnd.github.html+json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const nextPageUrl = getNextPageUrl(response);
                return response.json().then(json => {
                    if (!response.ok) {
                        return dispatch(notifyMessage({
                            status: "ERROR",
                            message: json.message,
                            notifiedAt: Date.now()
                        }));
                    }
                    dispatch(notifyMessage({status: "SUCCESS", message: "Updated!", notifiedAt: Date.now()}));
                    return dispatch(receiveEvents(json, nextPageUrl))
                })
            });
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
