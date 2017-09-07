import { combineReducers } from 'redux';
import {CHANGE_APP_MENU, REQUEST_LOGIN, OPEN_APP_DRAWER, UPDATE_TOKEN} from '../actions';

const app = (state = { menu: "", drawer: false }, action) => {
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
};

const setting = (state = { token: "", request: {done:false}}, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case REQUEST_LOGIN:
            return {
                ...state,
                request: action.request
            };
        default:
            return state;
    }
};


const reducers = combineReducers({
    app,
    setting
});

export default reducers;