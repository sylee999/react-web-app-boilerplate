import { combineReducers } from 'redux';
import app from './containers/App/reducer'
import settings from './containers/Settings/reducer'
import session from './containers/Session/reducer'
import events from './containers/Events/reducer'
import { configurablePendingTasksReducer } from './components/Indicator/pendingTask';

const pendingTasks = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
const reducers = combineReducers({
    app,
    settings,
    session,
    events,
    pendingTasks,
});

export default reducers;