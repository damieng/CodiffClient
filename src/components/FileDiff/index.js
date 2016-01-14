import React, { PropTypes } from 'react';

const { shape, arrayOf, string } = PropTypes;

const FileDiff = React.createClass({
  propTypes: {
    file: shape({
      path: string.isRequired,
      lines: arrayOf(string).isRequired
    })
  },
  styles: {
    code: {
      fontFamily: 'Consolas, Menlo, Courier, monospace'
    },
    line: {
      add: {
        backgroundColor: 'rgb(234, 255, 234)'
      },
      del: {
        backgroundColor: 'rgb(255, 236, 236)'
      },
      unchanged: {}
    }
  },
  render() {
    const { file } = this.props;
    const lines = file.lines
    .filter(line => line !== '--- \n' && line !== '+++ \n')
    .map((line, index) => {
      const operation = line[0] == '+' ? 'add' :
          line[0] === '-' ? 'del' :
          'unchanged';

      if(line[0] === '+' || line[0] === '-') line = line.substr(1);

      const lineStyle = this.styles.line[operation];
      return (
        <div key={index} style={lineStyle}>
          {line}
        </div>
      );
    });

    return (
      <div>
        <h4>{file.path}</h4>
        <div style={this.styles.code}>
          {lines}
        </div>
      </div>
    );
  }
});

export default FileDiff;
