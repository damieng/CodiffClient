import React, { PropTypes } from 'react';

const ProjectView = React.createClass({
  propTypes: {
    projects: PropTypes.array,
    selectedProjectIndex: PropTypes.number
  },
  render() {
    const { projects, selectedProjectIndex } = this.props;
    const selectedProject = projects[selectedProjectIndex];

    if (!selectedProject || !selectedProject.messages) {
      return (<pre>{JSON.stringify(this.props, null, 2)}</pre>);
    }

    return (
      <div>
        {selectedProject.messages.map((message, index) => {
          return (<pre key={index}>{JSON.stringify(message, null, 2)}</pre>);
        })}
      </div>
    );
  }
});

export default ProjectView;
