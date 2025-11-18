// PaymentSummary.jsx
import { useSelector } from "react-redux";
import "./Cart.css";

export default function PaymentSummary() {
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) return null;

  return (
    <div className="payment-summary">
      <h3>Payment Summary</h3>
      <div className="summary-row">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary-row">
        <span>Total Price:</span>
        <span>${totalPrice}</span>
      </div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
}
