import React, { PropTypes } from 'react';

import RepositoryDiff from '../../components/RepositoryDiff';
import RepositoryWatcher from '../../git/RepositoryWatcher';

const { string } = PropTypes;

const StatefulRepositoryDiff = React.createClass({
  propTypes: {
    localRepositoryPath: string.isRequired
  },
  getInitialState() {
    return {
      repository: {
        name: this.props.localRepositoryPath,
        localPath: this.props.localRepositoryPath,
        origin: 'shut up'
      },
      files: [],
    };
  },
  componentWillMount() {
    this.repositoryWatcher = new RepositoryWatcher(this.props.localRepositoryPath);
    this.repositoryWatcher.on('update', (diff) => {
      this.state.files = diff;
      if(this.state.selectedFile) {
        const previousFilePath = this.state.selectedFile.path;
        this.state.selectedFile = this.state.files
          .filter(f => f.path === previousFilePath)[0];
      }

      this.forceUpdate();
    });
  },
  onFileChanged(file) {
    this.state.selectedFile = file;
    this.forceUpdate();
  },
  render() {
    if(this.state.files.length === 0)
      return (<div>Loading...</div>);

    return (
      <div>
        <RepositoryDiff
          repository={this.state.repository}
          files={this.state.files}
          selectedFile={this.state.selectedFile || this.state.files[0]}
          onFileChanged={this.onFileChanged}
          />
      </div>);
  }
});

export default StatefulRepositoryDiff;
