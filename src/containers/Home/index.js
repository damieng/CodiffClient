import React from 'react';
import RepositoryWatcher from '../RepositoryWatcher';

const Home = React.createClass({
  render() {
    return (
      <div>
        Hello, world!
        <RepositoryWatcher />
      </div>
    );
  }
});


export default Home;
