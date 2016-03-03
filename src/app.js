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
const Loading = () => {
  return (<div>Loading...</div>);
}

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  (<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Loading} />
      <Route path="/setup" component={Setup} />
      <Route path="/home" component={Home} />
    </Router>
  </Provider>),
  document.getElementById('content'));

if(config.projects.length === 0) {
  hashHistory.push('/setup');
} else {
  hashHistory.push('/home');
}
