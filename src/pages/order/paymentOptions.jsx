// src/components/PaymentOptions.jsx
import React, { useState } from "react";

export default function PaymentOptions({
  finalTotal,
  onPlaceOrder,
  setPaymentMethod,
}) {
  const [selectedMethod, setSelectedMethod] = useState("cash"); // 'cash' or 'card'
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (selectedMethod === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill card details.");
        return;
      }
    }
    onPlaceOrder(cardDetails);
  };

  return (
    <div className="form-card" dir="ltr">
      <h2>💳 Payment Method</h2>

      <div
        onClick={() => handleMethodSelect("cash")}
        className={`payment-option ${selectedMethod === "cash" ? "selected" : ""}`}
        style={{ cursor: "pointer", padding: 10 }}
      >
        <input type="radio" checked={selectedMethod === "cash"} readOnly />
        <span style={{ marginLeft: 8 }}>Cash on Delivery (COD)</span>
      </div>

      <div
        onClick={() => handleMethodSelect("card")}
        className={`payment-option ${selectedMethod === "card" ? "selected" : ""}`}
        style={{ cursor: "pointer", padding: 10 }}
      >
        <input type="radio" checked={selectedMethod === "card"} readOnly />
        <span style={{ marginLeft: 8 }}>Credit / Mada Card Payment</span>
      </div>

      {selectedMethod === "card" && (
        <div className="card-details-form">
          <label>Card Number</label>
          <input
            type="text"
            name="number"
            value={cardDetails.number}
            onChange={handleCardChange}
            placeholder="xxxx xxxx xxxx xxxx"
          />

          <div className="card-fields-group" style={{ display: "flex", gap: 10 }}>
            <div className="card-field" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleCardChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="card-field" style={{ width: 120 }}>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardChange}
              />
            </div>
          </div>
        </div>
      )}

      <button onClick={handleSubmit} className="cta-button final" style={{ marginTop: 16 }}>
        Place Order & Pay ${finalTotal} 
      </button>

      <p className="secure-message">Secure Payment Process 🔒</p>
    </div>
  );
}
