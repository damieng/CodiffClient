'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ProjectPicker from './components/ProjectPicker';

const App = React.createClass({
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
});

ReactDOM.render((
  <App>
    <ProjectPicker />
  </App>
), document.getElementById('content'));
