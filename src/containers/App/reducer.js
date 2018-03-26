import {APP_MENU, APP_DRAWER} from "./actions";

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
