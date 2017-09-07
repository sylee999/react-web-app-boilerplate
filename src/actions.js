import fetch from 'isomorphic-fetch';
/*
 * action types
 */

export const CHANGE_APP_MENU = 'CHANGE_APP_MENU';
export const OPEN_APP_DRAWER = 'OPEN_APP_DRAWER';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQUEST_SESSION = 'REQUEST_SESSION';
export const RECEIVE_SESSION = 'RECEIVE_SESSION';

/*
 * action creators
 */

export const changeAppMenu = menu => ({type: CHANGE_APP_MENU, menu});
export const openAppDrawer = drawer => ({type: OPEN_APP_DRAWER, drawer});

export const updateToken = (event, token) => ({type: UPDATE_TOKEN, token});

export const requestLogin = token => {
    localStorage.token = token || localStorage.token;
    return dispatch => {
        dispatch(requestSession(localStorage.token));
        return fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'token ' + localStorage.token,
                'Accept': 'application/vnd.github.html+json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveSession(json)));
    }
};

export const requestSession = token => {
    return {
        type: REQUEST_SESSION,
        token
    }
};

export const receiveSession = session => {
    return {
        type: RECEIVE_SESSION,
        session
    }
};

