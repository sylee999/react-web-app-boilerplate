const APP_MENU = 'boilerplate/app/APP_MENU';
const APP_DRAWER = 'boilerplate/app/APP_DRAWER';
const APP_NOTIFICATION = 'boilerplate/app/APP_NOTIFICATION';

const reducer = (state = {menu: "", drawer: false, notification: {status: "DONE", message: ""}}, action) => {
    switch (action.type) {
        case APP_MENU:
            return {
                ...state,
                menu: action.menu
            };
        case APP_DRAWER:
            return {
                ...state,
                drawer: action.drawer
            };
        case APP_NOTIFICATION:
            return {
                ...state,
                notification: action.notification
            };
        default:
            return state;
    }
};
export default reducer;

export const setAppMenu = menu => ({type: APP_MENU, menu});
export const openAppDrawer = drawer => ({type: APP_DRAWER, drawer});
export const notifyMessage = notification => ({type: APP_NOTIFICATION, notification});