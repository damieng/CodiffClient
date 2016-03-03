import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepositoryWatcher from '../git/RepositoryWatcher';
import { diffReceived } from '../reducers/Projects';

const RepositoryWatcherComponent = React.createClass({
  propTypes: {
    projects: PropTypes.array,
    diffReceived: PropTypes.func
  },
  componentWillMount() {
    const { projects } = this.props;
    this.watchers = projects.map(project => {
      const watcher = new RepositoryWatcher(project.repository.localPath);
      watcher.on('update', (diff) => {
        this.props.diffReceived(project, diff);
      });

      return watcher;
    });
  },
  render() {
    return (<div />);
  }
});

export default connect(
  (state) => { return { projects: state.projects }; },
  (dispatch) => {
    return {
      diffReceived: bindActionCreators(diffReceived, dispatch)
    };
  }
)(RepositoryWatcherComponent);
