import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState.categories,
  reducers: {
    updateCategories: (state, action) => (state = action.payload), // Concise update
  },
});

// Include optional actions
export const { updateCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
