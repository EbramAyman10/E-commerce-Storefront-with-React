import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((i) => i.id === item.id);

      if (exist) exist.quantity += 1;
      else state.cartItems.push({ ...item, quantity: 1 });

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== id);

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) item.quantity = Math.max(quantity, 1);

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
