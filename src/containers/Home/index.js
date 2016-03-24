import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepositoryWatcher from '../RepositoryWatcher';
import ProjectViewer from '../../components/ProjectViewer';
import { getMessagesForProject, changeSelectedProjectIndex } from '../../reducers/Projects';

const { array, shape, number, func } = PropTypes;

const Home = React.createClass({
  propTypes: {
    projects: shape({
      projects: array
    }),
    selectedProjectIndex: number,
    onSelectedProjectIndexChanged: func,
    getMessagesForProject: func
  },
  componentDidMount() {
    console.log('componentDidMount');
  },
  componentWillReceiveProps(nextProps) {
    console.log(this.props.projects.projects.length);
    if(this.props.projects.projects.length > 0) return;
    const projectView = nextProps.projects;
    const { projects, selectedProjectIndex } = projectView;

    const activeProject = projects[selectedProjectIndex];
    console.log('componentWillReceiveProps');
    this.props.getMessagesForProject(activeProject);
  },
  render() {
    const { projects, selectedProjectIndex, onSelectedProjectIndexChanged } = this.props;
    if(projects.projects.length === 0) return (<div>Nothing here!</div>);
    return (
      <div>
        <ProjectViewer
          projects={projects.projects}
          selectedProjectIndex={selectedProjectIndex}
          onSelectedProjectIndexChanged={onSelectedProjectIndexChanged} />
        <RepositoryWatcher />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    selectedProjectIndex: state.projects.selectedProjectIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessagesForProject: bindActionCreators(getMessagesForProject, dispatch),
    onSelectedProjectIndexChanged: bindActionCreators(changeSelectedProjectIndex, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
