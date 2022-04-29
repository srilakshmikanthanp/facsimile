// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import KeyvalueReducer, { addKeyvalue, removeKey, renameKey } from "./KeyvalueSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Root Reducers
const rootReducer = combineReducers({
  keyvalue: KeyvalueReducer
});

export default rootReducer;

// actions
export {
  addKeyvalue,
  removeKey,
  renameKey
};
