import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepositoryWatcher from '../RepositoryWatcher';
import ProjectViewer from '../../components/ProjectViewer';

const { arrayOf, shape, number } = PropTypes;

const Home = React.createClass({
  propTypes: {
    projects: arrayOf(shape({
    })),
    selectedProjectIndex: number
  },
  render() {
    const { projects } = this.props;
    return (
      <div>
        <ProjectViewer projects={projects} selectedProjectIndex={0} />
        <RepositoryWatcher />
      </div>
    );
  }
});

export default connect(
  (state) => { return { projects: state.projects }; }
)(Home);
