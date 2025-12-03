import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.total = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCart, setError, clearError, setLoading } = cartSlice.actions;

// Fetch Cart
export const fetchCart = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const products = res.data.data?.products?.map((p) => ({
      id: p.productId._id,
      title: p.productId.name,
      image: p.productId.image,
      price: p.productId.price,
      quantity: p.quantity,
    }));
    dispatch(setCart(products));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || err.message));
  }
  dispatch(setLoading(false));
};

// Add to Cart
export const addProductToCart =
  (productId, quantity = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchCart());
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  };

// Remove from Cart
export const removeProductFromCart = (productId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCart());
  } catch (err) {
    dispatch(setError(err.response?.data?.message || err.message));
  }
};
// Update Quantity
export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await api.post(
      "/cart/add",
      { productId, quantity }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(fetchCart());
  } catch (err) {
    dispatch(setError(err.response?.data?.message || err.message));
  }
};

export default cartSlice.reducer;
