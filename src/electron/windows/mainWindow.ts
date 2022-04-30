// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BrowserWindow, clipboard, ipcMain } from 'electron';
import { ipcevents } from '../constants';
import { store } from "../functions";
import { Pair } from '../interfaces';

// Function to create Main Window
export default function createMainWindow(preload: string, loadURL: string) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    icon: null,
    height: 400,
    width: 350,
    frame: false,
    show: false,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      devTools: process.env.NODE_ENV !== "production",
      preload: preload
    }
  });

  // get the key value
  ipcMain.handle(ipcevents.GET_KEY_VALUE, (event, key: string) => {
    return store.getKeyValue(key); // two way
  });

  // set the Key Value
  ipcMain.on(ipcevents.SET_KEY_VALUE, (event, pair: Pair) => {
    store.setKeyValue(pair); // one way render -> main
  });

  // delete a key
  ipcMain.on(ipcevents.DEL_KEY_VALUE, (event, key: string) => {
    store.deleteKey(key); // one way render -> main
  })

  // get the all values
  ipcMain.handle(ipcevents.ALL_KEY_VALUE, () => {
    return store.getAllKeyValues(); // two way
  });

  // Hide the Electron Window
  ipcMain.on(ipcevents.HIDE_ELECTRON, () => {
    mainWindow.isVisible() && mainWindow.hide();
  });

  // copy the key value to clipboard
  ipcMain.on(ipcevents.CPY_KEY_VALUE, async (event, key: string) => {
    clipboard.writeText(await store.getKeyValue(key));
  });

  // and load the index.html of the app.
  mainWindow.loadURL(loadURL);

  // return the created window.
  return mainWindow;
}
