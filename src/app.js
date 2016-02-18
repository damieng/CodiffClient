import React, { PropTypes }from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';

import LocalRepositoriesList from './components/LocalRepositoriesList';
import reducer from './reducers';
import { addRepository, createProject } from './reducers/Repositories';

let App = React.createClass({
  propTypes: {
    repositories: PropTypes.array,
    addRepository: PropTypes.func,
    createProject: PropTypes.func,
  },
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.props.repositories}
          localRepositorySearchPaths={['~/git']}
          onLocalRepositoryAdded={this.props.addRepository}
          onCreateProject={this.props.createProject}
          />
      </div>
    );
  }
});

App = connect(
  (state) => { return { repositories: state.repositories }; },
    (dispatch) => {
      return {
        addRepository: bindActionCreators(addRepository, dispatch),
        createProject: bindActionCreators(createProject, dispatch)
      };
    }
)(App);

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('content'));
