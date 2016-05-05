import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from './reducers';
import {
  Setup,
  Home,
  Login
} from './containers';

const Loading = () => {
  return (<div>Loading...</div>);
};

const store = createStore(reducer, applyMiddleware(thunk), autoRehydrate());
persistStore(store, { blacklist: ['repositories', 'user'] }, () => {
  const state = store.getState();
  if (!state.user.token) {
    hashHistory.push('/login');
  } else if (state.projects.projects.length === 0) {
    hashHistory.push('/setup');
  } else {
    hashHistory.push('/home');
  }
});

store.subscribe(() => {
  const state = store.getState();
  if (window.location.hash.indexOf('#/login') > -1 && state.user.token) {
    if (state.projects.projects.length === 0) {
      hashHistory.push('/setup');
    } else {
      hashHistory.push('/home');
    }
  }
});

ReactDOM.render(
  (<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Loading} />
      <Route path="/login" component={Login} />
      <Route path="/setup" component={Setup} />
      <Route path="/home" component={Home} />
    </Router>
  </Provider>),
  document.getElementById('content'));
