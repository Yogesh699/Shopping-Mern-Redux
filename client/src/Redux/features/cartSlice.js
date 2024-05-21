import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState.cart,
  reducers: {
    addToCart: (state, action) => [...state, action.payload],
    addMultipleToCart: (state, action) => [...state, ...action.payload],
    removeFromCart: (state, action) =>
      state.filter((product) => product._id !== action.payload),
    updateCartQuantity: (state, action) =>
      state.map((product) =>
        product._id === action.payload._id
          ? { ...product, purchaseQuantity: action.payload.purchaseQuantity }
          : product
      ),
    clearCart: () => [],
  },
});

export const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
