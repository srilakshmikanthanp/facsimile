// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPair from "../../interfaces/IPair";

/***********************
 *      Selectors      *
 **********************/

// Key Value Selector
export const selectKeyValues = (state: { keyValues: { list: IPair<string, string>[]; }; }): IPair<string, string>[] => {
  return state.keyValues.list.slice(0, undefined).sort((a, b) => {
    return a.key.localeCompare(b.key);
  });
};

/**********************
 *  Internal Actions  *
 *********************/

// Add new key value pair
const _addNewKeyValue = (state: { list: IPair<string, string>[] }, action: PayloadAction<IPair<string, string>>) => {
  if (state.list.find((e) => e.key === action.payload.key)) {
    state.list[state.list.indexOf(action.payload)] = action.payload;
  } else {
    state.list.push(action.payload);
  }
}

// remove key value pair
const _removeKeyValue = (state: { list: IPair<string, string>[] }, action: PayloadAction<IPair<string, string>>) => {
  state.list = state.list.filter((e) => e.key !== action.payload.key);
}

/********************
 *  Slice Creation  *
 *******************/

// Create the slice
const KeyValueSlice = createSlice({
  name: "keyValues",
  initialState: { list: [] as Array<IPair<string, string>> },
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
