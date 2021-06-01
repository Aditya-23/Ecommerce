import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import { createBrowserHistory } from 'history'
import { Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/combineReducer"
import {CookiesProvider} from "react-cookie"

const history = createBrowserHistory()

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <Provider store={store}>
      <Router history={history}>
          <App />
      </Router>
    </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
