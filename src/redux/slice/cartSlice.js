import { createSlice } from "@reduxjs/toolkit";

// لو فيه داتا في localStorage هتتحمل
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: initialCart,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) item.quantity += 1;

      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;

      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    calculateTotal: (state) => {
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
