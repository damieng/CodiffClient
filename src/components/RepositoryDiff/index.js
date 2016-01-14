import React, { PropTypes } from 'react';
import FileDiff from '../FileDiff';

const { shape, string, arrayOf } = PropTypes;

const DiffView = React.createClass({
  propTypes: {
    repository: shape({
      name: string.isRequired,
      origin: string.isRequired,
      localPath: string.isRequired,
    }).isRequired,
    files: arrayOf(shape({
      path: string.isRequired,
      lines: arrayOf(string).isRequired
    })).isRequired
  },
  render() {
    const { repository, files } = this.props;
    return (
      <div>
        <h3>{repository.name}</h3>
        <h4>{repository.origin}</h4>
        {files.map((file, index) => (<FileDiff file={file} key={index} />))}
      </div>);
  }
});

export default DiffView;
