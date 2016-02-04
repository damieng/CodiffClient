import React from 'react';
import ReactDOM from 'react-dom';

import LocalRepositoriesList from './components/LocalRepositoriesList';
import { createStore } from 'redux';
import reducer from './reducers/LocalRepositories';

const store = createStore(reducer);

const App = React.createClass({
  createProject(repository) {
    store.dispatch({ type: 'CREATE_PROJECT', repository });
  },
  joinProject(repository, project) {
    store.dispatch({ type: 'JOIN_PROJECT', repository, project });
  },
  localRepositoryAdded(repository) {
    console.log(repository);
    store.dispatch({ type: 'ADD_REPOSITORY', repository });
  },
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={store.getState()}
          localRepositorySearchPaths={['~/git']}
          onJoinProject={this.joinProject}
          onCreateProject={this.createProject}
          onLocalRepositoryAdded={this.localRepositoryAdded}
          />
      </div>
    );
  }
});

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('content'));
}

render();
store.subscribe(render);
