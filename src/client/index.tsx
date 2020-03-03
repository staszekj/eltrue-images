import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from "redux-saga";
import * as serviceWorker from './serviceWorker';

import App from './view/App';

import {rootSaga} from "./saga/root-saga";
import {rootReducer} from "./redux/root-reducer";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";

const composeEnv =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line @typescript-eslint/no-explicit-any
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    undefined,
    composeEnv(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
