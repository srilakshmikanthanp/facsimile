// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pair } from "../../interfaces";

// Key value State
export interface KeyvalueState { [key: string]: string; }

// initial state
const initialState: KeyvalueState = {};

// Key value slice
export const KeyvalueSlice = createSlice({
  name: "keyvalue",
  initialState,
  reducers: {
    // Rename the key 
    renameKey: (state, action: PayloadAction<{oldKey: string, newKey: string}>) => {
      const value = state[action.payload.oldKey];
      state[action.payload.newKey] = value;
      delete state[action.payload.oldKey];
    },
    // Remove the key value pair
    removeKey: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    // Add the key value pair to state
    addKeyvalue: (state, action: PayloadAction<Pair>) => {
      state[action.payload.key] = action.payload.value;
    },
  }
});

// Export the action
export const { addKeyvalue, removeKey, renameKey } = KeyvalueSlice.actions;

// Export the reducer
export default KeyvalueSlice.reducer;