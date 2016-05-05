import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepositoryWatcher from '../git/RepositoryWatcher';
import { diffReceived } from '../reducers/Projects';

const RepositoryWatcherComponent = React.createClass({
  propTypes: {
    projects: PropTypes.array,
    diffReceived: PropTypes.func,
  },
  componentWillMount() {
    const { projects } = this.props;
    this.watchers = projects.map(project => {
      const watcher = new RepositoryWatcher(project.repository.localPath);
      watcher.on('update', (delta) => {
        if (delta.hash === project.diffHash) return;
        this.props.diffReceived(project, delta);
      });

      return watcher;
    });
  },
  render() {
    return (<div />);
  }
});

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    diffReceived: bindActionCreators(diffReceived, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryWatcherComponent);
