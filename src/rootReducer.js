import { combineReducers } from 'redux';
import app from './containers/App/reducer'
import settings from './containers/Settings/reducer'
import session from './containers/Session/reducer'
import events from './containers/Events/reducer'
import { configurableIndicatorReducer } from './containers/Indicator/reducer';

const indicator = configurableIndicatorReducer({ actionKeyPath: [ 'meta' ] });
const reducers = combineReducers({
    app,
    settings,
    session,
    events,
    indicator,
});

export default reducers;