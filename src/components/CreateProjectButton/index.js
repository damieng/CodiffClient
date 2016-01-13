import React, { PropTypes } from 'react';

const CreateProjectButton = React.createClass({
  propTypes: {
    repository: PropTypes.object.isRequired
  },
  contextTypes: {
    onCreateProject: PropTypes.func
  },
  render() {
    return (
      <div>
        <a onClick={() => this.context.onCreateProject(this.props.repository)}>
          create a new project
        </a>
      </div>
    );
  }
});

export default CreateProjectButton;
