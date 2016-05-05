import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../reducers/User';
import Configuration from '../../config';

const BrowserWindow = require('electron').remote.BrowserWindow;
const config = new Configuration();
const loginUrl = config.loginUrl;

const Login = React.createClass({
  propTypes: {
    onAuthTokenRetrieved: PropTypes.func.isRequired
  },
  spawnLoginWindow() {
    const loginWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: false
      }
    });

    loginWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      if (newUrl.indexOf('/login/done?') === -1) return;

      const authToken = newUrl.split('?')[1];
      this.props.onAuthTokenRetrieved(authToken);
      loginWindow.close();
    });

    loginWindow.loadURL(loginUrl);
  },
  render() {
    return (
      <div>
        <button onClick={this.spawnLoginWindow}>Log in to Github</button>
      </div>
    );
  }
});

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuthTokenRetrieved: bindActionCreators(signIn, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
