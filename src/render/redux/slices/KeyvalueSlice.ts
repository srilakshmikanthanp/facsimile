// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pair from "../../interfaces/Pair";

/***********************
 *      Selectors      *
 **********************/

// Key Value Selector
export const selectKeyValues = (state: { keyValues: { list: Pair<string, string>[]; }; }): Pair<string, string>[] => {
  return state.keyValues.list.slice(0, undefined).sort((a, b) => {
    return a.key.localeCompare(b.key);
  });
};

/**********************
 *  Internal Actions  *
 *********************/

// Add new key value pair
const _addNewKeyValue = (state: { list: Pair<string, string>[] }, action: PayloadAction<Pair<string, string>>) => {
  state.list.push(action.payload);
}

// remove key value pair
const _removeKeyValue = (state: { list: Pair<string, string>[] }, action: PayloadAction<Pair<string, string>>) => {
  state.list.splice(state.list.indexOf(action.payload), 1);
}

/********************
 *  Slice Creation  *
 *******************/

// Create the slice
const KeyValueSlice = createSlice({
  name: "keyValues",
  initialState: { list: [] as Array<Pair<string, string>> },
  reducers: {
    // Remove a keyvalue pair
    removeKeyValue: _removeKeyValue,
    // Add a keyvalue pair
    addNewKeyValue: _addNewKeyValue,
  }
});

/********************
 * Export Reducer   *
 *******************/

// Export the reducer
export default KeyValueSlice.reducer;

/*******************
 * Export Actions  *
 ******************/

// Export the Actions
export const { addNewKeyValue, removeKeyValue } = KeyValueSlice.actions;
