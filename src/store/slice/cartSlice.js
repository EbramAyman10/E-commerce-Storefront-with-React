import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  lastAction: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLocal: (state, action) => {
      state.cartItems = action.payload.products.map((p) => ({
        _id: p.productId._id,
        name: p.productId.name,
        price: p.productId.price,
        image: p.productId.image,
        quantity: p.quantity,
      }));

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    addToCartLocal: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload._id);

      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    updateQuantityLocal: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload.id);

      if (item) item.quantity = action.payload.quantity;

      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      state.lastAction = {
        type: "update",
        _id: action.payload.id,
        quantity: action.payload.quantity,
      };
    },
    removeFromCartLocal: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.error = null;
    },
  },
});

export const {
  setCartLocal,
  addToCartLocal,
  updateQuantityLocal,
  removeFromCartLocal,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
