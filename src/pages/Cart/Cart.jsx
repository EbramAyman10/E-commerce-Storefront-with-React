import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeProductFromCart,
  updateCartQuantity,
} from "../../store/slice/cartSlice";
import "./Cart.css";
import PaymentSummary from "./paymentSummary";
import { useEffect } from "react";
export default function CartPage() {
  const dispatch = useDispatch();

  const { cartItems, loading, error } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

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
                <div className="cart-item" key={cartItem.id}>
                  <img className="product-image" src={cartItem.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.title}</div>
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
                          dispatch(
                            updateCartQuantity(
                              cartItem.id,
                              Number(e.target.value)
                            )
                          );
                        }}
                      />

                      <span
                        className="delete-quantity-link link-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeProductFromCart(cartItem.id));
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
