import React from 'react';
import LocalRepositoriesList from '../../components/LocalRepositoriesList';

const LocalRepositoriesList = React.createClass({
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.state.repositories}
          onJoinProject={this.joinProject}
          onCreateProject={this.createProject}
          />
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
});

export default StatefulLocalRepositoriesList;
