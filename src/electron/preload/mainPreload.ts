// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { contextBridge, ipcRenderer } from "electron";
import * as ipcevents from "../constants/ipcevents";
import Pair from "../interface/pair";

// Expose the APi to render
contextBridge.exposeInMainWorld("keyvalueAPI", {
  setKeyValue: (pair: Pair<string, string>) => ipcRenderer.send(ipcevents.SET_KEY_VALUE, pair),
  getKeyValue: (key: string) => ipcRenderer.invoke(ipcevents.GET_KEY_VALUE, key),
  delKeyValue: (key: string) => ipcRenderer.send(ipcevents.DEL_KEY_VALUE, key),
  getAllKeyValues: () => ipcRenderer.invoke(ipcevents.ALL_KEY_VALUE),
  copyKeyValue: (key: string) => ipcRenderer.send(ipcevents.CPY_KEY_VALUE, key),
  hideWindow: () => ipcRenderer.send(ipcevents.HIDE_ELECTRON),
});
