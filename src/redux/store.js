// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productssSlice";
import categoriesReducer from "./slice/categoriesSlice";
import cartReducer from "./slice/cartSlice";
import ProductDetailsReducer from "./slice/productDetailsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    productDetails: ProductDetailsReducer,
  },
});
export default store;
