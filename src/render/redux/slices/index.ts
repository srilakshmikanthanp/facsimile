// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import KeyvaluesReducer, { addNewKeyvalue, removeKeyvalue, selectKeyvalues } from "./KeyvalueSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Root Reducers
const rootReducer = combineReducers({
  keyvalues: KeyvaluesReducer
});

// Export
export default rootReducer;

// selectors
export { selectKeyvalues };

// actions
export { addNewKeyvalue, removeKeyvalue };
