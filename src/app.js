'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
    render() {
      return (
        <div>
          <p>hello, react world!</p>
        </div>
      )
    }
});

ReactDOM.render(<App />, document.getElementById('content'));
