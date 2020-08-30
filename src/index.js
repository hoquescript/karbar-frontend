import React from "react";
import { render } from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import createSaga from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';

import uiReducer from './Store/interface'
import menuReducer from './Store/menu'
import formReducer from './Store/form'
import formsReducer from "./Store/Reducers/forms";
import {watchMenu, watchControl } from "./Store/Sagas";


const uiPersistConfig = {
  key: 'ui',
  storage,
  blacklist: ['breadCrumb']
}
const rootReducer = combineReducers({
    ui: uiReducer,
    menu: menuReducer,
    form: formReducer,
    forms: formsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['breadCrumb']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const saga = createSaga();

const store = configureStore({
  reducer: persistedReducer, 
  middleware: [ saga ]
});

saga.run(watchMenu);
saga.run(watchControl);

const app = (
  <Provider store={store}>
    <PersistGate loading={"null"} persistor={persistStore(store)}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

render(app, document.getElementById("root"));
