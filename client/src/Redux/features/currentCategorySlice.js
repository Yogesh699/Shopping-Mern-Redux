import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

const currentCategorySlice = createSlice({
  name: "currentCategory",
  initialState: initialState.currentCategory,
  reducers: {
    updateCurrentCategory: (state, action) => (state = action.payload),
  },
});

export const { updateCurrentCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;
