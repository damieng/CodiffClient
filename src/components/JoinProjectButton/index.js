import React, { PropTypes } from 'react';

const ProjectJoinButton = React.createClass({
  propTypes: {
    project: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      popularity: PropTypes.number.isRequired,
      logoUrl: PropTypes.string.isRequired,
      isPrivate: PropTypes.bool.isRequired,
      isJoining: PropTypes.bool.isRequired,
      hasJoined: PropTypes.bool.isRequired
    }),
    repository: PropTypes.object.isRequired
  },
  contextTypes: {
    onJoinProject: PropTypes.func
  },
  style: {
    container: {
      display: 'inline-block',
      marginRight: 10,
      textAlign: 'center'
    },
    logoUrl: {
      width: 128,
      height: 128,
      marginBottom: 10
    },
    joinButton: {
      width: 128
    }
  },
  render() {
    const { name, createdBy, logoUrl, isJoining, hasJoined } = this.props.project;
    const { onJoinProject } = this.context;

    let buttonText = 'join';
    if(isJoining) buttonText = 'joining...';
    if(hasJoined) buttonText = 'joined';
    return (
      <div style={this.style.container}>
        <div>{name} by {createdBy}</div>
        <img src={logoUrl} title={name} alt={name} style={this.style.logoUrl} />
        <div>
          <button
            style={this.style.joinButton}
            disabled={isJoining || hasJoined}
            onClick={() => onJoinProject(this.props.repository, this.props.project)}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
});

export default ProjectJoinButton;
