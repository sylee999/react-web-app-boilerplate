import { combineReducers } from 'redux';
import {CHANGE_APP_MENU, REQUEST_SESSION, OPEN_APP_DRAWER, UPDATE_TOKEN, RECEIVE_SESSION} from '../actions';

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

const setting = (state = { token: localStorage.token }, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case RECEIVE_SESSION:
            return {
                ...state,
                session: action.session
            };
        case REQUEST_SESSION:
        default:
            return state;
    }
};


const reducers = combineReducers({
    app,
    setting
});

export default reducers;