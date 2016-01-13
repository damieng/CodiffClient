import React, { PropTypes } from 'react';

import LocalRepositoryListItem from '../LocalRepositoryListItem';

const LocalRepositoriesList = React.createClass({
  propTypes: {
    repositories: PropTypes.arrayOf(PropTypes.shape({
      localPath: PropTypes.string.isRequired,
      remoteOrigin: PropTypes.string.isRequired
    })).isRequired,
    onJoinProject: PropTypes.func,
    onCreateProject: PropTypes.func
  },
  childContextTypes: {
    onJoinProject: PropTypes.func,
    onCreateProject: PropTypes.func
  },
  getChildContext() {
    return {
      onCreateProject: (repo) => {
        this.props.onCreateProject(repo);
      },
      onJoinProject: (repo, project) => {
        if(!this.props.onJoinProject)
          return;

        this.props.onJoinProject(repo, project);
      }
    };
  },
  styles: {
    container: {
      margin: 20
    }
  },
  render() {
    const items = this.props.repositories.map((repo, index) => (
      <li className="list-group-item" key={index}>
        <LocalRepositoryListItem
          key={index}
          repository={repo}
        />
      </li>
    ));
    return (
      <div className="panel panel-default" style={this.styles.container}>
        <div className="panel-heading">
          Join project
        </div>
        <div className="panel-body">
          <p>Join a project here.</p>
        </div>
        <ul className="list-group">
          {items}
        </ul>
      </div>
    );
  }
});

export default LocalRepositoriesList;
