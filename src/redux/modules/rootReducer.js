import { combineReducers } from 'redux';
import app from './app'
import settings from './settings'
import session from './session'
import events from './events'
import { configurablePendingTasksReducer } from 'react-redux-spinner';

const pendingTasks = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
const reducers = combineReducers({
    app,
    settings,
    session,
    events,
    pendingTasks,
});

export default reducers;