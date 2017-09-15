import { combineReducers } from 'redux';
import {
    APP_MENU, APP_DRAWER, APP_NOTIFICATION,
    TOKEN_UPDATE,
    USER_REQUEST, USER_RECEIVE,
    EVENTS_REQUEST, EVENTS_RECEIVE, GUEST_USER, DARK_MODE_UPDATE, ACCOUNT_UPDATE
} from '../actions';

const app = (state = {menu: "", drawer: false, notification: {status: "DONE", message: ""}}, action) => {
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

const setting = (state = {token: "", account:{}, darkMode:false}, action) => {
    switch (action.type) {
        case TOKEN_UPDATE:
            return {
                ...state,
                token: action.token
            };
        case ACCOUNT_UPDATE:
            return {
                ...state,
                account: action.account
            };
        case DARK_MODE_UPDATE:
            return {
                ...state,
                darkMode: action.darkMode
            };
        default:
            return state;
    }
};

const session = (state = {user: GUEST_USER, isFetching: false}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case USER_RECEIVE:
            return {
                ...state,
                user: action.user,
                lastUpdated: action.receivedAt,
                isFetching: false
            };
        default:
            return state;
    }
};

const events = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case EVENTS_RECEIVE:
            return {
                ...state,
                items: state.items.concat(action.items),
                nextPageUrl: action.nextPageUrl,
                isFetching: true
            };
        default:
            return state;
    }
};

const reducers = combineReducers({
    app,
    setting,
    session,
    events,
});

export default reducers;