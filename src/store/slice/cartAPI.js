import api from "../../api/axios";
import { setCartLocal } from "./cartSlice";
export const syncGetCart = () => async (dispatch) => {
  try {
    const response = await api.get("/cart");

    if (response.data.data) {
      dispatch(setCartLocal(response.data.data));
    }
  } catch (error) {
    console.log("Error fetching cart:", error);
    dispatch(setCartLocal({ products: [] }));
  }
};
export const syncAddToCart = (_id, quantity) => async () => {
  try {
    await api.post("/cart/add", { productId: _id, quantity });
  } catch (error) {
    console.log(error);
  }
};

export const syncRemoveFromCart = (id) => async () => {
  try {
    await api.delete(`/cart/remove/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const syncUpdateCartQuantity = (id, qty) => async () => {
  try {
    await api.post("/cart/add", { productId: id, quantity: qty });
  } catch (error) {
    console.log(error);
  }
};
