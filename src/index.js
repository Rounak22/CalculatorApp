import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { CalculatorReducer } from "./Reducers/reducers";
import { Provider } from 'react-redux';
export const middleware = [thunkMiddleware.withExtraArgument()];



export const finalReducer = combineReducers({
  CalculatorReducer
});

export function startup() {
	const store = createStore(
		finalReducer,
		compose(applyMiddleware(...middleware))
	);


	return store;
}

export const container = document.getElementById("root");
const globalstore = startup();
export { globalstore };
ReactDOM.render(
  <Provider store={globalstore}>

    <App />

  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
