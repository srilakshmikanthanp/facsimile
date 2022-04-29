// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { combineReducers } from "@reduxjs/toolkit";
import KeyvalueReducer from "./slice/KeyvalueSlice";

// Root Reducers
export const rootReducer = combineReducers ({
    keyvalue: KeyvalueReducer
})
