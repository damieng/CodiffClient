import React from 'react';
import ReactDOM from 'react-dom';

import StatefulRepositoryDiff from './components/StatefulRepositoryDiff';
import StatefulLocalRepositoriesList from './components/StatefulLocalRepositoriesList';

const App = React.createClass({
  render() {
    return (
      <div>
        <StatefulRepositoryDiff localRepositoryPath="/Users/gisenberg/git/codiff-react" />
        <StatefulLocalRepositoriesList />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content'));
