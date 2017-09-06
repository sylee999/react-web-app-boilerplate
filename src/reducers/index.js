import { combineReducers } from 'redux';
import {CHANGE_APP_MENU, OPEN_APP_DRAWER} from '../actions';

const initialAppState = {
    menu: "",
    drawer: false,
};

function app(state = initialAppState, action) {
    switch (action.type) {
        case CHANGE_APP_MENU:
            return {
                ...state,
                menu: action.menu
            };
        case OPEN_APP_DRAWER:
            return {
                ...state,
                drawer: action.drawer
            };
        default:
            return state;
    }
}

const reducers = combineReducers({
    app
});

export default reducers;