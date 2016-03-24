import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from './reducers';
import Setup from './containers/Setup';
import Home from './containers/Home';

const Loading = () => {
  return (<div>Loading...</div>);
};

const store = createStore(reducer, applyMiddleware(thunk), autoRehydrate());
persistStore(store, { blacklist: ['repositories'] }, () => {
  const state = store.getState();
  console.log(state);
  if(state.projects.projects.length === 0) {
    hashHistory.push('/setup');
  } else {
    hashHistory.push('/home');
  }
});

ReactDOM.render(
  (<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Loading} />
      <Route path="/setup" component={Setup} />
      <Route path="/home" component={Home} />
    </Router>
  </Provider>),
  document.getElementById('content'));
