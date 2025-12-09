// src/store/slice/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Async Thunks

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const res = await api.get("/cart");
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch cart", err);
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ _id, quantity }, thunkAPI) => {
    try {
      const res = await api.post("/cart/add", { productId: _id, quantity });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add to cart", err);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (_id, thunkAPI) => {
    try {
      await api.delete(`/cart/remove/${_id}`);
      return _id;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to remove item", err);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ _id, quantity }, thunkAPI) => {
    try {
      const res = await api.post("/cart/add", { productId: _id, quantity });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update quantity", err);
    }
  }
);

// Slice
const initialState = {
  cartItems: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantityLocal: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload._id);
      if (item) item.quantity = action.payload.quantity;
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
  extraReducers: (builder) => {
    builder
      //get cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
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
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload.products[0];
        const item = state.cartItems.find(
          (i) => i._id === newItem.productId._id
        );
        if (item) {
          item.quantity += newItem.quantity;
        } else {
          state.cartItems.push({
            _id: newItem.productId._id,
            name: newItem.productId.name,
            price: newItem.productId.price,
            image: newItem.productId.image,
            quantity: newItem.quantity,
          });
        }
        state.total = state.cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // remove from the cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== action.payload
        );
        state.total = state.cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      //update quantity
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload.products[0];
        const item = state.cartItems.find(
          (i) => i._id === updatedItem.productId._id
        );
        if (item) {
          item.quantity = updatedItem.quantity;
        }

        state.total = state.cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart,updateQuantityLocal } = cartSlice.actions;
export default cartSlice.reducer;
