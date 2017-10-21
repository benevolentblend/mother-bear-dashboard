/************************************************************
 * Author:          Benjamin Thomas
 * Major:           Software Development
 * Creation Date:   October 21, 2017
 * Due Date:        TBD
 * Course:          CSC354 010
 * Professor Name:  Dr. Hussain
 * Filename:        main.js
 * Purpose:         Main application file that loads the web page
/************************************************************/

const electron = require('electron');
const {app, BrowserWindow} = electron;

// When ready, create the main window
app.on('ready', () => {
  let win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/resources/index.html`);
});

// When all windows have been closed, quit the application
app.on('window-all-closed', () => {
  app.quit();
});
