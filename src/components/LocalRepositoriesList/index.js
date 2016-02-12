import path from 'path';
import os from 'os';
import fs from 'fs';
import git from 'git-utils';
import React, { PropTypes } from 'react';

import LocalRepositoryListItem from '../LocalRepositoryListItem';

const getRemotes = function(git) {
  const remotes = git.getReferences().remotes.map(remote => {
    return remote.split('/')[2];
  }).reduce((p, remote) => {
    if(p.indexOf(remote) < 0) p.push(remote);
    return p;
  }, []).map(remote => {
    return {
      remote,
      url: git.getConfigValue(`remote.${remote}.url`),
      projects: []
    };
  });

  return remotes;
};

const getOriginUrl = function(git) {
  const remotes = getRemotes(git);
  const origin = remotes.filter(r => r.remote === 'origin')[0];

  if(origin)
    return origin.url;
};

const LocalRepositoriesList = React.createClass({
  propTypes: {
    repositories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      projects: PropTypes.array.isRequired,
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
    }, []).map((repoPath) => {
      return {
        localPath: repoPath,
        git: git.open(repoPath)
      };
    }).filter(repo => {
      return repo.git;
    }).map((repo, index) => {
      const origin = getOriginUrl(repo.git);
      const pathParts = repo.localPath.split('/');
      const name = pathParts[pathParts.length - 1];
      return {
        id: index,
        name,
        projects: [],
        localPath: repo.localPath,
        origin
      };
    }).filter((repo) => repo.origin).forEach(repo => {
      this.props.onLocalRepositoryAdded(repo);
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
