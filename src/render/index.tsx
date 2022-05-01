// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addNewKeyvalue } from "./redux/slices";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Theme } from "./components";
import { Pair } from "./interfaces";
import store from "./redux/store";
import React from "react";
import App from "./App";

// Current state
const previousState: { list: Pair[] } = { list: [] as Pair[] };

// Handle Change
const observeKeyvalueStateChange = () => {
  if (previousState.list !== store.getState().keyvalues.list) {
    // Filter the Difference between the previous and current state
    const currentState = store.getState().keyvalues.list;

    // Deleted keyvalue
    const deletedKeyvalues = previousState.list.filter(
      (item: Pair) => {
        return !currentState.includes(item)
      });

    // Send the difference to main process
    deletedKeyvalues.forEach((item: Pair) => {
      window.keyvalueAPI.delKeyValue(item.key);
    });

    // Added new keyvalue
    const addedKeyvalues = currentState.filter(
      (item: Pair) => {
        return !previousState.list.includes(item)
      });

    // Send the difference to main process
    addedKeyvalues.forEach((item: Pair) => {
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
  .then((keyvalues: Pair[]) => {
    keyvalues.forEach((item: Pair) => {
      store.dispatch(addNewKeyvalue(item));
    });
  });
