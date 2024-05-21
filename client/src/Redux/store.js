import { combineReducers, createStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categoriesSlice";
import currentCategoryReducer from "./features/currentCategorySlice";
import productsReducer from "./features/produsctsSlice";
import cartReducer from "./features/cartSlice";
import cartOpenReducer from "./features/cartOpenSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  cartOpen: cartOpenReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer,
});

const store = createStore(rootReducer);
export default store;
