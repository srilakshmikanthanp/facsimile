// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pair } from "../../interfaces";

/***********************
 *      Selectors      *
 **********************/

// Key Value Selector
export const selectKeyvalues = (state: { keyvalues: { list: Pair[]; }; }): Pair[] => {
  return state.keyvalues.list.slice(0, undefined).sort((a, b) => {
    return a.key.localeCompare(b.key);
  });
};

/**********************
 *  Internal Actions  *
 *********************/

// Add new key value pair
const _addNewKeyValue = (state: {list: Pair[]}, action: PayloadAction<Pair>) => {
  state.list.push(action.payload);
}

// remove key value pair
const _removeKeyValue = (state: {list: Pair[]}, action: PayloadAction<Pair>) => {
  state.list.splice(state.list.indexOf(action.payload), 1);
}

/********************
 *  Slice Creation  *
 *******************/

// Create the slice
const KeyvaluesSlice = createSlice({
  name: "keyvalues",
  initialState: { list: [] as Array<Pair> },
  reducers: {
    // Remove a keyvalue pair
    removeKeyvalue: _removeKeyValue,
    // Add a keyvalue pair
    addNewKeyvalue: _addNewKeyValue,
  }
});

/********************
 * Export Reducer   *
 *******************/

// Export the reducer
export default KeyvaluesSlice.reducer;

/*******************
 * Export Actions  *
 ******************/

// Export the Actions
export const { addNewKeyvalue, removeKeyvalue } = KeyvaluesSlice.actions;
