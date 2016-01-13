import React, { PropTypes } from 'react';

import JoinProjectButton from '../JoinProjectButton';

const LocalRepositoryListItem = React.createClass({
  propTypes: {
    projects: PropTypes.array.isRequired,
    localPath: PropTypes.string.isRequired,
    remoteOrigin: PropTypes.string.isRequired
  },
  render() {
    const buttons = this.props.projects.map((p, index) => (
      <JoinProjectButton key={index} project={p} />
    ));
    return (
      <div>
        <h4>{this.props.remoteOrigin} ({this.props.localPath})</h4>
        {buttons}
      </div>
    );
  }
});

export default LocalRepositoryListItem;
