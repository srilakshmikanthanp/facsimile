// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import { addNewKeyValue } from "./redux/slices";
import Pair from "./interfaces/IPair";
import store from "./redux/store";
import App from "./App";

// Current state
const previousState: { list: Pair<string, string>[] } = { list: [] as Pair<string, string>[] };

// Handle Change
const observeKeyValueStateChange = () => {
  if (previousState.list !== store.getState().keyValues.list) {
    // Filter the Difference between the previous and current state
    const currentState = store.getState().keyValues.list;

    // Deleted keyValue
    const deletedKeyValues = previousState.list.filter(
      (item: Pair<string, string>) => {
        return !currentState.includes(item)
      });

    // Send the difference to main process
    deletedKeyValues.forEach((item: Pair<string, string>) => {
      window.keyValueAPI.delKeyValue(item.key);
    });

    // Added new keyValue
    const addedKeyValues = currentState.filter(
      (item: Pair<string, string>) => {
        return !previousState.list.includes(item)
      });

    // Send the difference to main process
    addedKeyValues.forEach((item: Pair<string, string>) => {
      window.keyValueAPI.setKeyValue(item);
    });

    // Update the previous state
    previousState.list = currentState;
  }
}

// Subscribe to the store
store.subscribe(observeKeyValueStateChange);

// Root Element to render the React App
const rootElement = document.getElementById("root");

// react root
const reactRoot = ReactDOM.createRoot(rootElement);

// Render to DOM
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Load the initial state
window.keyValueAPI.getAllKeyValues()
  .then((keyValues: Pair<string, string>[]) => {
    keyValues.forEach((item: Pair<string, string>) => {
      store.dispatch(addNewKeyValue(item));
    });
  });
