import { combineReducers } from 'redux';
import app from './app'
import settings from './settings'
import session from './session'
import events from './events'

const reducers = combineReducers({
    app,
    settings,
    session,
    events,
});

export default reducers;