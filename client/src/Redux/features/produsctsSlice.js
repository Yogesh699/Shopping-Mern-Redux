import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

const productsSlice = createSlice({
  name: "products",
  initialState: initialState.products,
  reducers: {
    updateProducts: (state, action) => (state = action.payload), // Concise update
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
