/*
 * action types
 */

export const CHANGE_APP_MENU = 'CHANGE_APP_MENU';
export const OPEN_APP_DRAWER = 'OPEN_APP_DRAWER';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';

/*
 * action creators
 */

export const changeAppMenu = menu => ({type: CHANGE_APP_MENU, menu});
export const openAppDrawer = drawer => ({type: OPEN_APP_DRAWER, drawer});

export const updateToken = (event, token) => ({type: UPDATE_TOKEN, token});
export const requestLogin = event => {
    return {
        type: REQUEST_LOGIN,
        request: {done: true, message: "request login."}
    }
}
