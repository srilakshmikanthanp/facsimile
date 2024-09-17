// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import KeyValueSlice, { addNewKeyValue, removeKeyValue, selectKeyValues } from "./KeyValueSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Root Reducers
const rootReducer = combineReducers({
  keyValues: KeyValueSlice
});

// Export
export default rootReducer;

// selectors
export { selectKeyValues };

// actions
export { addNewKeyValue, removeKeyValue };
