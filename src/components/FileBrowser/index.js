import React, { PropTypes } from 'react';

const { string, func, arrayOf, shape } = PropTypes;
const fileShape = shape({
  path: string.isRequired,
  lines: arrayOf(string).isRequired
});

const FileBrowser = React.createClass({
  propTypes: {
    files: arrayOf(fileShape).isRequired,
    selectedFile: fileShape.isRequired,
    onFileChanged: func.isRequired
  },
  styles: {
    active: {
      backgroundColor: '#ccc'
    }
  },
  render() {
    const { files, selectedFile, onFileChanged } = this.props;
    return (
      <div>
        {files.map((file, index) => (
          file === selectedFile ?
            <div key={index} style={this.styles.active}>{file.path}</div> :
            <div onClick={() => onFileChanged(file)} key={index}>{file.path}</div>
        ))}
      </div>
    );
  }
});

export default FileBrowser;
