import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JoinProjectButton from '.';

const project = {
  id: 'foo',
  name: 'Sample Project',
  createdBy: 'damieng',
  popularity: 1.0,
  logoUrl: 'http://placekitten.com/120/120',
  isPrivate: true,
  isJoining: false,
  hasJoined: false
};

const repository = {
};

storiesOf('JoinProjectButton')
  .add('join', () => {
    return (
      <JoinProjectButton project={project} repository={repository} />
    );
  })
  .add('joining', () => {
    const newProject = Object.assign({}, project, { isJoining: true });
    return (
      <JoinProjectButton project={newProject} repository={repository} />
    );
  })
  .add('joined', () => {
    const newProject = Object.assign({}, project, { hasJoined: true });
    return (
      <JoinProjectButton project={newProject} repository={repository} />
    );
  })
  ;

