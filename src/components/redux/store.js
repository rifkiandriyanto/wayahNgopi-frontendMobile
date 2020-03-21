import AsyncStorage from '@react-native-community/async-storage'
import {createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer} from 'redux-persist'

import reducers from './reducers';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: [
    'auth',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const logger = createLogger({})
const store = createStore(
  persistedReducer,
    applyMiddleware(
      logger,
      promiseMiddleware
    ),
);

let persistor = persistStore(store);

export {
  store,
  persistor,
};
