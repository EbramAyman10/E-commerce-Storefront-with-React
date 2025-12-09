import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  updateQuantityLocal,
} from "../../store/slice/cartSlice";

import "./Cart.css";
import PaymentSummary from "./paymentSummary";
import { useEffect } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, [dispatch, isLoggedIn]);
  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleUpdate = (_id, qty) => {
    dispatch(updateQuantityLocal({ _id, quantity: qty }));
    dispatch(updateCartQuantity({ _id, quantity: qty }));
  };

  return (
    <div className="cart-item-details-grid">
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">There is nothing in your cart</div>
        ) : (
          <div className="checkout-grid">
            <div className="items">
              {cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                  <img className="product-image" src={cartItem.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.name}</div>
                    <div className="product-price">${cartItem.price}</div>

                    <div className="product-quantity">
                      <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>

                      <input
                        type="number"
                        value={cartItem.quantity}
                        min="1"
                        onChange={(e) => {
                          e.stopPropagation();
                          const val = Number(e.target.value);
                          if (val > 0) {
                            handleUpdate(cartItem._id, val);
                          }
                        }}
                      />

                      <span
                        className="delete-quantity-link link-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(cartItem._id);
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="payment">
              <PaymentSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
