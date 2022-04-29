// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { app, BrowserWindow, globalShortcut } from 'electron';
import { APP_SHORTCUT_KEY } from './constants';
import { createMainFrame } from "./frames";

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).

// Main Window Preload Entry
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Main Window Load entry
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Main Window is created on app.on('ready')
let mainFrame: BrowserWindow | null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // register key to toggle main window visibility
  globalShortcut.register(APP_SHORTCUT_KEY, () => {
    if (mainFrame && mainFrame.isVisible()) {
      mainFrame.hide();
    } else if (mainFrame) {
      mainFrame.show();
    }
  });

  // create the main window.
  mainFrame = createMainFrame(
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    MAIN_WINDOW_WEBPACK_ENTRY,
  );
});

// Close the window when the application is Lost Focus.
app.on('browser-window-blur', (event, window) => {
  if (!window.webContents.isDevToolsOpened()) {
    window.hide()
  }
});
