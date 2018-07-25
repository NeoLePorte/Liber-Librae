import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import configureStore from './store';

//App is enclosed in the Provider component to allow the app access to the redux store.
ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

