import React, { PropTypes } from 'react';

const ProjectJoinButton = React.createClass({
  propTypes: {
    project: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      popularity: PropTypes.number.isRequired,
    }).isRequired
  },
  contextTypes: {
    onJoinProject: PropTypes.func
  },
  render() {
    const { project } = this.props;
    const { onJoinProject } = this.context;
    return (
      <div>
        {project.name} {project.createdBy}
        <button onClick={() => onJoinProject(project)}>join</button>
      </div>
    );
  }
});

const LocalRepositoryListItem = React.createClass({
  propTypes: {
    projects: PropTypes.array.isRequired,
    localPath: PropTypes.string.isRequired,
    remoteOrigin: PropTypes.string.isRequired
  },
  render() {
    const projectJoinButtons = this.props.projects.map((p, index) => (
      <ProjectJoinButton key={index} project={p} />
    ));
    return (
      <div>
        Project (local: {this.props.localPath}, remote: {this.props.remoteOrigin})
        {projectJoinButtons}
      </div>
    );
  }
});

const LocalRepositoriesList = React.createClass({
  propTypes: {
    repositories: PropTypes.arrayOf(PropTypes.shape({
      localPath: PropTypes.string.isRequired,
      remoteOrigin: PropTypes.string.isRequired
    })).isRequired
  },
  childContextTypes: {
    onJoinProject: PropTypes.func
  },
  getChildContext() {
    return {
      onJoinProject: (p) => {
        console.log(p);
      }
    };
  },
  render() {
    const items = this.props.repositories.map((repo, index) => (
      <LocalRepositoryListItem
        key={index}
        projects={[{ id: '1', name: 'foo', createdBy: 'bar', popularity: 10 }]}
        {...repo}
      />
    ));
    return (
      <div>
        {items}
      </div>
    );
  }
});

export default LocalRepositoriesList;
