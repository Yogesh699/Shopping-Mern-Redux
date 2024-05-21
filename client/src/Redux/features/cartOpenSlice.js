import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

const cartOpenSlice = createSlice({
  name: "cartOpen",
  initialState: initialState.cartOpen,
  reducers: {
    toggleCart: (state) => !state,
    openCart: () => true, // Optional action for explicit opening
    closeCart: () => false, // Optional action for explicit closing
  },
});

export const { toggleCart, openCart, closeCart } = cartOpenSlice.actions; // Include optional actions

export default cartOpenSlice.reducer;
