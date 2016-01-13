import React from 'react';
import ReactDOM from 'react-dom';
import LocalRepositoriesList from './components/LocalRepositoriesList';

const App = React.createClass({
  getInitialState() {
    return {
      repositories: [
        {
          name: 'codiff',
          localPath: '/Users/gisenberg/git/codiff',
          remoteOrigin: 'git@github.com:gisenberg/codiff',
          projects: [
            { id: '1', name: 'Public', createdBy: 'gisenberg', popularity: 100, logoUrl: 'http://lorempixum.com/128/128', isPrivate: false, isJoining: false, hasJoined: false },
            { id: '2', name: 'Contributors', createdBy: 'damieng', popularity: 10, logoUrl: 'http://lorempixum.com/128/128', isPrivate: false, isJoining: false, hasJoined: false },
            { id: '3', name: 'Intracia', createdBy: 'damieng', popularity: 0, private: true, logoUrl: 'http://lorempixum.com/130/130/technics', isPrivate: false, isJoining: false, hasJoined: false },
          ]
        },
        {
          name: 'codiff-react',
          localPath: '/Users/gisenberg/git/codiff-react',
          remoteOrigin: 'git@github.com:gisenberg/codiff-react',
          projects: [
            { id: '4', name: 'Public', createdBy: 'gisenberg', popularity: 10, logoUrl: 'http://lorempixum.com/129/129/technics', isPrivate: false, isJoining: false, hasJoined: false },
            { id: '5', name: '1337 kr3w', createdBy: 'rovio', popularity: 10, logoUrl: 'http://lorempixum.com/128/128/technics', isPrivate: false, isJoining: false, hasJoined: false }
          ]
        }
      ]
    };
  },
  createProject(repository) {
    repository.projects.push(
      { id: '5', name: '1337 kr3w', createdBy: 'rovio', popularity: 10, logoUrl: 'http://lorempixum.com/128/128/technics', isPrivate: false, isJoining: false, hasJoined: true }
    );
    this.setState(this.state);
  },
  joinProject(repository, project) {
    project.isJoining = true;
    this.setState(this.state);
    setTimeout(() => {
      project.isJoining = false;
      project.hasJoined = true;
      this.setState(this.state);
    }, 1500);
  },
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.state.repositories}
          onJoinProject={this.joinProject}
          onCreateProject={this.createProject}
          />
      </div>
    );
  }
});

ReactDOM.render((
  <App />
), document.getElementById('content'));
