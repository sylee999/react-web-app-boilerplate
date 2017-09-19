export const APP_MENU = 'APP_MENU';
export const APP_DRAWER = 'APP_DRAWER';
export const APP_NOTIFICATION = 'APP_NOTIFICATION';

export const setAppMenu = menu => ({type: APP_MENU, menu});
export const openAppDrawer = drawer => ({type: APP_DRAWER, drawer});
export const notifyMessage = notification => ({type: APP_NOTIFICATION, notification});


export const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE';
export const TOKEN_UPDATE = 'TOKEN_UPDATE';
export const DARK_MODE_UPDATE = 'DARK_MODE_UPDATE';

export const loadSettings = () => {
    return dispatch => {
        const settings = getSettings();
        dispatch(updateAccount(settings.account || {}));
        dispatch(updateDarkMode(settings.darkMode || false));
    }
};

const getSettings = () => {
    try {
        return JSON.parse(localStorage.settings);
    } catch (err) {
        console.warn(err);
        return {};
    }
};

const saveSettings = settings => {
    localStorage.settings = JSON.stringify(settings);
};

export const saveAccount = (account) => {
    return (dispatch, getState) => {
        if (account.token && !/^[a-z0-9]+$/i.test(account.token)) {
            return notifyMessage({status: "ERROR", message: "Invalid token string.", notifiedAt: Date.now()});
        }
        const settings = getState().settings;
        settings.account = account;
        saveSettings(settings);

        dispatch(updateAccount(account));
    }
};

const updateAccount = (account) => {
    return {type: ACCOUNT_UPDATE, account}
};

export const saveDarkMode = (darkMode) => {
    return (dispatch, getState) => {
        const settings = getState().settings;
        settings.darkMode = darkMode;
        saveSettings(settings);

        dispatch(updateDarkMode(darkMode));
    };
};

const updateDarkMode = (darkMode) => {
    return {type: DARK_MODE_UPDATE, darkMode}
};

export const USER_REQUEST = 'USER_REQUEST';
export const USER_RECEIVE = 'USER_RECEIVE';

export const GUEST_USER = {
    avatar_url: 'images/guest.png',
    name: 'Guest',
    login: '',
    url: '',
};

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

export const EVENTS_REQUEST = 'EVENTS_REQUEST';
export const EVENTS_RECEIVE = 'EVENTS_RECEIVE';

export const requestEvents = () => ({type: EVENTS_REQUEST});
export const receiveEvents = (items, nextPageUrl) => ({type: EVENTS_RECEIVE, nextPageUrl: nextPageUrl, receivedAt: Date.now(), items});

export const fetchEvents = (username, nextPageUrl) => {
    return (dispatch, getState) => {
        const account = getState().settings.account;
        if (!account.url || !account.token) {
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

