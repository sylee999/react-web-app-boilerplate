/*
 * action types
 */

export const CHANGE_APP_MENU = 'CHANGE_APP_MENU';
export const OPEN_APP_DRAWER = 'OPEN_APP_DRAWER';
export const NOTIFY_MESSAGE = 'NOTIFY_MESSAGE';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQUEST_SESSION = 'REQUEST_SESSION';
export const UPDATE_SESSION = 'UPDATE_SESSION';

/*
 * action creators
 */

export const changeAppMenu = menu => ({type: CHANGE_APP_MENU, menu});
export const openAppDrawer = drawer => ({type: OPEN_APP_DRAWER, drawer});
export const notifyMessage = message => ({type: NOTIFY_MESSAGE, message});

export const updateToken = (token) => ({type: UPDATE_TOKEN, token});

export const requestLogin = token => {
    localStorage.token = token || localStorage.token;
    return dispatch => {
        if (!/^[a-z0-9]+$/i.test(localStorage.token)) {
            return dispatch(notifyMessage({status: "ERROR", message: "Invalid token string.", notifiedAt: Date.now()}));
        }
        dispatch(requestSession(localStorage.token));
        return fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'token ' + localStorage.token,
                'Accept': 'application/vnd.github.html+json',
                'Content-Type': 'application/json'
            }
        })
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        dispatch(notifyMessage({status: "ERROR", message: json.message, notifiedAt: Date.now()}));
                        return dispatch(updateSession(""))
                    }

                    dispatch(notifyMessage({status: "SUCCESS", message: "Welcome " + json.name, notifiedAt: Date.now()}));
                    return dispatch(updateSession(json))
                })
            );
    }
};

export const requestLogout = () => {
    localStorage.token = "";
    return dispatch => {
        dispatch(updateToken(""));
        dispatch(updateSession(undefined));
    }
};

export const requestSession = token => {
    return {
        type: REQUEST_SESSION,
        token
    }
};

export const updateSession = session => {
    return {
        type: UPDATE_SESSION,
        receivedAt: Date.now(),
        session
    }
};

