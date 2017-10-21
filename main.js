const electron = require('electron');
const {app, BrowserWindow} = electron;

// When ready, create the main window
app.on('ready', () => {
  let win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/index.html`);
});

// When all windows have been closed, quit the application
app.on('window-all-closed', () => {
  app.quit();
});
