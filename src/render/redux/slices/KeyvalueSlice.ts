// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pair } from "../../interfaces";

// Key Value Selector
export const selectKeyvalues = (state: { keyvalues: { list: Pair[]; }; }): Pair[] => {
  return state.keyvalues.list;
};

// initial state
const initialState: { list: Pair[]; } = { list: [] };

// Create the slice
const KeyvaluesSlice = createSlice({
  name: "keyvalues",
  initialState,
  reducers: {
    // Add a keyvalue pair
    addNewKeyvalue: (state, action: PayloadAction<Pair>) => {
      state.list.push(action.payload);
    },
    // Remove a keyvalue pair
    removeKeyvalue: (state, action: PayloadAction<Pair>) => {
      state.list.splice(state.list.indexOf(action.payload), 1);
    },
  }
});

// export actions
export const { addNewKeyvalue, removeKeyvalue } = KeyvaluesSlice.actions;

// Export the reducer
export default KeyvaluesSlice.reducer;
