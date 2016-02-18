import React, { PropTypes }from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';

import LocalRepositoriesList from './components/LocalRepositoriesList';
import reducer from './reducers';
import { addRepository } from './reducers/Repositories';

let App = React.createClass({
  propTypes: {
    repositories: PropTypes.array,
    addRepository: PropTypes.func,
  },
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.props.repositories}
          localRepositorySearchPaths={['~/git']}
          onLocalRepositoryAdded={this.props.addRepository}
          />
      </div>
    );
  }
});

App = connect(
  (state) => { return { repositories: state.repositories }; },
    (dispatch) => {
      return { addRepository: bindActionCreators(addRepository, dispatch) };
    }
)(App);

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('content'));
