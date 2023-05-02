import { compose, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { loggerMiddleware } from './middleware/logger';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
    );

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
window && 
window.__REDUX_DEVTOOS_EXTENSION_COMPOSE__) || 
compose;

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({reducer: persistedReducer, middleware: [loggerMiddleware], composedEnhancers})

export const persistor = persistStore(store);

