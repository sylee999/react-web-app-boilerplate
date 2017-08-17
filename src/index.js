import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
// import { createStore, applyMiddleware } from 'redux';

injectTapEventPlugin();

// const createStoreWithMiddleware = applyMiddleware(
//     thunkMiddleware, // 함수를 dispatch() 하게 해줍니다
//     loggerMiddleware // 액션을 로깅하는 깔끔한 미들웨어입니다
// )(createStore);

// const store = createStoreWithMiddleware(AppReducer);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/about" component={About}/>
        </div>
    </Router>,
    document.getElementById('root')
);
