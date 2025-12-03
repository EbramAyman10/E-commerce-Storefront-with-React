// src/components/ShippingForm.jsx
import React, { useState, useEffect } from "react";

export default function ShippingForm({ onSubmit, initial = {} }) {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      setShippingInfo((s) => ({ ...s, ...initial }));
    }
  }, [initial]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(shippingInfo);
  };

  return (
    <div className="form-card" dir="ltr">
      <h2> Shipping Information🚚</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={shippingInfo.name}
          onChange={handleChange}
          required
        />

        <label>
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
        />

        <label>
          Detailed Address <span className="required">*</span>
        </label>
        <textarea
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          required
        />

        <button type="submit" className="cta-button primary">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
