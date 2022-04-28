// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BrowserWindow } from 'electron';

// Function to create Main Window
export default function createMainFrame(preload: string, loadURL: string) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    icon: null,
    height: 400,
    width: 350,
    frame: false,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      devTools: process.env.NODE_ENV !== "production",
      preload: preload
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(loadURL);

  // return the created window.
  return mainWindow;
}
