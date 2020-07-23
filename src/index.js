import React from "react";
import { render } from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

import createSaga from "redux-saga"
import menuReducer from './Store/Reducers/menu'
import formReducer from "./Store/Reducers/forms";
import { watchMenu, watchControl } from "./Store/Sagas";

const rootReducer = combineReducers({
    menu: menuReducer,
    forms: formReducer
})

const saga = createSaga();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(saga)));

saga.run(watchMenu);
saga.run(watchControl);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

render(app, document.getElementById("root"));
