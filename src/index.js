import React from 'react';
import {render} from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore'
import App from './App';

injectTapEventPlugin();

const store = configureStore();

render(
    <Router>
        <App store={store}/>
    </Router>,
    document.getElementById('root')
);

