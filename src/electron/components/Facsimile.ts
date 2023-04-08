// Copyright (c) 2023 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

/**
 * Facsimile Window Class
 */
export default class Facsimile extends BrowserWindow {
  constructor(options: BrowserWindowConstructorOptions) {
    super(options); // Call the BrowserWindow Constructor

    // Hide the window when it loses focus
    this.on('blur', () => this.hide());
  }
}
