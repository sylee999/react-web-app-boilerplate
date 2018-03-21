const APP_MENU = 'boilerplate/app/APP_MENU';
const APP_DRAWER = 'boilerplate/app/APP_DRAWER';

const reducer = (state = {menu: "", drawer: false}, action) => {
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
        default:
            return state;
    }
};
export default reducer;

export const setAppMenu = menu => ({type: APP_MENU, menu});
export const openAppDrawer = drawer => ({type: APP_DRAWER, drawer});
