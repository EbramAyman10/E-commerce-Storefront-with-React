// PaymentSummary.jsx
import { useSelector } from "react-redux";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function PaymentSummary() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) return null;
  const handleCheckout = () => {
    navigate("/order");
  };
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
      <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}
