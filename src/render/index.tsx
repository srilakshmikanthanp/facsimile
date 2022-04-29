// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import React from "react";
import App from "./App";

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
