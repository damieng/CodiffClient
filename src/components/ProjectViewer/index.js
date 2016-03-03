import React, { PropTypes } from 'react';

const ProjectView = React.createClass({
  propTypes: {
    thread: PropTypes.object
  },
  render() {
    if(!this.props.thread || !this.props.thread.messages) {
      return (<div>Nothing here!</div>);
    }

    const { messages } = this.props.thread;
    return (
      <div>
        { messages.map((message, index) => {
          return (<div key={index}>{message}</div>);
        })}
      </div>
    );
  }
});

export default ProjectView;
