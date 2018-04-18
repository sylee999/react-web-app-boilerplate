import { combineReducers } from 'redux';
import app from './containers/App/reducer'
import settings from './containers/Settings/reducer'
import session from './containers/Session/reducer'
import events from './containers/Events/reducer'
import { configurableNotificationReducer } from './containers/Notification/reducer';
import { configurablePendingTasksReducer } from 'react-redux-spinner';

const notification = configurableNotificationReducer({ actionKeyPath: [ 'meta' ] });
const pendingTasks = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
const reducers = combineReducers({
    app,
    settings,
    session,
    events,
    notification,
    pendingTasks,
});

export default reducers;