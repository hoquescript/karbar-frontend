import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSaga from "redux-saga"
import { BrowserRouter as Router } from "react-router-dom";
import menuReducer from './Store/Reducers/menu'
import { watchMenu, watchControl } from "./Store/Sagas";
import formReducer from "./Store/Reducers/forms";

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

ReactDOM.render(app, document.getElementById("root"));
