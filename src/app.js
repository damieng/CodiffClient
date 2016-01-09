import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import LocalRepositoriesList from './components/LocalRepositoriesList';

const App = React.createClass({
  propTypes: {
    children: PropTypes.object
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

const state = {
  repositories: [
    { localPath: '/Users/Gabriel/git/codiff', remoteOrigin: 'git@github.com' },
    { localPath: '/Users/Gabriel/git/codiff', remoteOrigin: 'git@github.com' }
  ]
};

ReactDOM.render((
  <App>
    <LocalRepositoriesList repositories={state.repositories}/>
  </App>
), document.getElementById('content'));
