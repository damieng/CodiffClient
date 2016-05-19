/* eslint-disable prefer-arrow-callback */
import { app, BrowserWindow } from 'electron';

let mainWindow = null;

app.on('window-all-closed', function windowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function appReady() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function appClosed() {
    mainWindow = null;
  });
});
