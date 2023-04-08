// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addNewKeyValue } from "./redux/slices";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Theme } from "./components";
import Pair from "./interfaces/Pair";
import store from "./redux/store";
import React from "react";
import App from "./App";

// Current state
const previousState: { list: Pair<string, string>[] } = { list: [] as Pair<string, string>[] };

// Handle Change
const observeKeyvalueStateChange = () => {
  if (previousState.list !== store.getState().keyValues.list) {
    // Filter the Difference between the previous and current state
    const currentState = store.getState().keyValues.list;

    // Deleted keyvalue
    const deletedKeyvalues = previousState.list.filter(
      (item: Pair<string, string>) => {
        return !currentState.includes(item)
      });

    // Send the difference to main process
    deletedKeyvalues.forEach((item: Pair<string, string>) => {
      window.keyvalueAPI.delKeyValue(item.key);
    });

    // Added new keyvalue
    const addedKeyvalues = currentState.filter(
      (item: Pair<string, string>) => {
        return !previousState.list.includes(item)
      });

    // Send the difference to main process
    addedKeyvalues.forEach((item: Pair<string, string>) => {
      window.keyvalueAPI.setKeyValue(item);
    });

    // Update the previous state
    previousState.list = currentState;
  }
}

// Subscribe to the store
store.subscribe(observeKeyvalueStateChange);

// Root Element to render the React App
const rootElement = document.getElementById("root");

// react root
const reactRoot = ReactDOM.createRoot(rootElement);

// Render to DOM
reactRoot.render(
  <Provider store={store}>
    <Theme>
      <App />
    </Theme>
  </Provider>
);

// Load the initial state
window.keyvalueAPI.getAllKeyValues()
  .then((keyvalues: Pair<string, string>[]) => {
    keyvalues.forEach((item: Pair<string, string>) => {
      store.dispatch(addNewKeyValue(item));
    });
  });
