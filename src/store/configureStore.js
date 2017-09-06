import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import {createLogger} from "redux-logger";

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default configureStore