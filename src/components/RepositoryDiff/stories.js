import React from 'react';
import { storiesOf } from '@kadira/storybook';
import RepositoryDiff from '.';

const repository = {
  name: 'CodiffClient',
  origin: 'git@github.com:damieng/CodiffClient',
  localPath: '/Users/gisenberg/git/codiff-client'
};

const indexFile = {
  path: 'index.js',
  lines: [
    '+ foo',
    '- bar',
    'baz'
  ]
};

const files = [
  indexFile
];

const selectedFile = indexFile;

const onFileChanged = () => {};

storiesOf('RepositoryDiff')
  .add('single file', () => {
    return (
      <RepositoryDiff
        repository={repository}
        selectedFile={selectedFile}
        files={files}
        onFileChanged={onFileChanged}
        />
    );
  })
  .add('multiple files', () => {
    const multipleFiles = [].concat(files).concat([
      { path: 'src/components/blah.js', lines: [] }
    ]);
    return (
      <RepositoryDiff
        repository={repository}
        selectedFile={selectedFile}
        files={multipleFiles}
        onFileChanged={onFileChanged}
        />
    );
  })
  ;

