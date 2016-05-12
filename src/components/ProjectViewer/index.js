import React, { PropTypes } from 'react';
import FileDiff from '../FileDiff';

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
        <h3>{selectedProject.project.name}</h3>
        {selectedProject.messages.map((message, index) => {
          return (
            <div key={index} className="panel panel-default">
              <div className="panel-heading">
                {message.from}
              </div>
              <div className="panel-body">
                <p>
                  {message.text}
                </p>
                {message.files.map((file, fileIndex) => {
                  const { filename, contents } = file;
                  const fileObj = {
                    path: filename,
                    lines: contents.split('\n')
                  };

                  return (
                    <div key={fileIndex}>
                      <h4>{filename}</h4>
                      <FileDiff file={fileObj} />
                    </div>
                  );
                })}
              </div>
            </div>
            );
        })}
      </div>
    );
  }
});

export default ProjectView;
