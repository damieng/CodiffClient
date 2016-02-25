import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LocalRepositoriesList from '../../components/LocalRepositoriesList';
import { addRepository, createProject } from '../../reducers/Repositories';

const Setup = React.createClass({
  propTypes: {
    repositories: PropTypes.array,
    addRepository: PropTypes.func,
    createProject: PropTypes.func,
  },
  render() {
    return (
      <div>
        <LocalRepositoriesList
          repositories={this.props.repositories}
          localRepositorySearchPaths={['~/git']}
          onLocalRepositoryAdded={this.props.addRepository}
          onCreateProject={this.props.createProject}
          />
      </div>
    );
  }
});

export default connect(
  (state) => { return { repositories: state.repositories }; },
    (dispatch) => {
      return {
        addRepository: bindActionCreators(addRepository, dispatch),
        createProject: bindActionCreators(createProject, dispatch)
      };
    }
)(Setup);
