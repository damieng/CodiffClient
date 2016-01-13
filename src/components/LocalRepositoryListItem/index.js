import React, { PropTypes } from 'react';

import JoinProjectButton from '../JoinProjectButton';
import CreateProjectButton from '../CreateProjectButton';

const LocalRepositoryListItem = React.createClass({
  propTypes: {
    repository: PropTypes.shape({
      name: PropTypes.string.isRequired,
      projects: PropTypes.array.isRequired,
      localPath: PropTypes.string.isRequired,
      remoteOrigin: PropTypes.string.isRequired
    })
  },
  render() {
    const { repository } = this.props;
    const buttons = repository.projects.map((p, index) => (
      <JoinProjectButton key={index} project={p} repository={repository} />
    ));
    return (
      <div>
        <h3>{repository.name} ({repository.remoteOrigin})</h3>
        {buttons}
        <CreateProjectButton repository={repository} />
      </div>
    );
  }
});

export default LocalRepositoryListItem;
