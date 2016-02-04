import path from 'path';
import os from 'os';
import fs from 'fs';
import git from 'git-utils';
import React, { PropTypes } from 'react';

import LocalRepositoryListItem from '../LocalRepositoryListItem';

const LocalRepositoriesList = React.createClass({
  propTypes: {
    repositories: PropTypes.arrayOf(PropTypes.shape({
      localPath: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired
    })).isRequired,
    onJoinProject: PropTypes.func,
    onCreateProject: PropTypes.func,
    onLocalRepositoryAdded: PropTypes.func,
    localRepositorySearchPaths: PropTypes.arrayOf(PropTypes.string)
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
  componentWillMount() {
    this.props.localRepositorySearchPaths.map(repositorySearchPath => {
      return path.resolve(repositorySearchPath.replace('~', os.homedir()));
    }).map(repositorySearchPath => {
      return fs.readdirSync(repositorySearchPath).map(f => path.resolve(repositorySearchPath, f));
    }).reduce((arr, paths) => {
      paths.forEach(p => arr.push(p));
      return arr;
    }, []).filter(repoPath => {
      return git.open(repoPath);
    }).forEach(gitRepo => {
      this.props.onLocalRepositoryAdded(gitRepo);
    });
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
