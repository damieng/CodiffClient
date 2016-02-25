import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router';

import reducer from './reducers';
import Setup from './containers/Setup';
import Home from './containers/Home';
import Configuration from './config';

const config = new Configuration();
console.log(config.configPath);

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  (<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Setup} />
      <Route path="/home" component={Home} />
    </Router>
  </Provider>),
  document.getElementById('content'));
