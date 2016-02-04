import React from 'react';
import ReactDOM from 'react-dom';

import RepositoryDiff from './containers/RepositoryDiff';
import LocalRepositoriesList from './containers/LocalRepositoriesList';

const App = React.createClass({
  render() {
    return (
      <div>
        <RepositoryDiff localRepositoryPath="/Users/gisenberg/git/codiff-react" />
        <LocalRepositoriesList />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content'));
