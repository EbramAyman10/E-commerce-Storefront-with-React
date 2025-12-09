export default function PaymentOptions({ finalTotal, onPlaceOrder }) {
  const handleSubmit = () => {
    onPlaceOrder();
  };

  return (
    <div className="form-card" dir="ltr">
      <h2>💳 Payment Method</h2>

      <div
        className="payment-option selected"
        style={{ cursor: "default", padding: 10 }}
      >
        <input type="radio" checked readOnly />
        <span style={{ marginLeft: 8 }}>Cash on Delivery (COD)</span>
      </div>

      <button
        onClick={handleSubmit}
        className="cta-button final"
        style={{ marginTop: 16 }}
      >
        Place Order & Pay ${finalTotal}
      </button>

      <p className="secure-message">Payment on Delivery 🛵</p>
    </div>
  );
}
