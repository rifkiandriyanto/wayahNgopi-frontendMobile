import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';


import reducers from './reducers';

const store = createStore(
    reducers,
    composeWithDevTools( 
        applyMiddleware(
            logger,
            promiseMiddleware
        )
    )
);

export default store;