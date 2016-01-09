import { app, BrowserWindow } from 'electron';
// const electron = require('electron');
// const app = electron.app;  // Module to control application life.
// const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

let mainWindow = null;

app.on('window-all-closed', function windowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function appReady() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function appClosed() {
    mainWindow = null;
  });
});
