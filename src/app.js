import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { createStore, bindActionCreators } from 'redux';

import LocalRepositoriesList from './components/LocalRepositoriesList';
import reducer from './reducers';

import { addRepository } from './reducers/Repositories';

let App = React.createClass({
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.props.repositories}
          localRepositorySearchPaths={['~/git']}
          onLocalRepositoryAdded={this.props.addRepository}
          />
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
});

App = connect(
  (state) => { return { repositories: state.repositories }; },
  { addRepository }
)(App);

const store = createStore(reducer);
ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('content'));
