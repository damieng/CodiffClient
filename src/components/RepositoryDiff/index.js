import React, { PropTypes } from 'react';
import FileBrowser from '../FileBrowser';
import FileDiff from '../FileDiff';

const { shape, string, func, arrayOf } = PropTypes;

const fileShape = shape({
  path: string.isRequired,
  lines: arrayOf(string).isRequired
});

const RepositoryDiff = React.createClass({
  propTypes: {
    repository: shape({
      name: string.isRequired,
      origin: string.isRequired,
      localPath: string.isRequired,
    }).isRequired,
    files: arrayOf(fileShape).isRequired,
    selectedFile: fileShape.isRequired,
    onFileChanged: func.isRequired
  },
  styles: {
    sidebar: {
      position: 'relative'
    }
  },
  render() {
    const { repository, files, selectedFile, onFileChanged } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <h3>{repository.name}</h3>
            <h4>{repository.origin}</h4>
          </div>
        </div>
        <div className="container">
          <div className="row" styles={this.styles.sidebar}>
            <div className="col-xs-2 left">
              <FileBrowser
                files={files}
                selectedFile={selectedFile}
                onFileChanged={onFileChanged}
                />
            </div>
            <div className="col-xs-8 col-md-10 content">
              <FileDiff file={selectedFile} />
            </div>
          </div>
        </div>
      </div>);
  }
});

export default RepositoryDiff;
