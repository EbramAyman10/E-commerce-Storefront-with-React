// src/components/OrderSummary.jsx
import React from "react";

export default function OrderSummary({
  products = [],
  subtotal = 0,
  shippingCost = 0,
  finalTotal = 0,
}) {
  return (
    <div className="summary-card" dir="ltr">
      <h3 className="summary-title">Order Summary</h3>

      {products.length === 0 && <p>Cart is empty</p>}

      {products.map((item, idx) => {
        const title =
          item.product?.name ??
          item.name ??
          item.productId?.name ??
          `Item ${idx + 1}`;
        const price = item.price ?? item.product?.price ?? 0;
        const qty = item.quantity ?? 1;
        return (
          <div key={idx} className="summary-item">
            <span className="item-name">
              {title} (x{qty})
            </span>
            <span className="item-price">${(price * qty).toFixed(2)}  </span>
          </div>
        );
      })}

      <div className="summary-divider"></div>

      <div className="summary-line">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)} </span>
      </div>
      <div className="summary-line">
        <span>Shipping Cost:</span>
        <span>${shippingCost.toFixed(2)}</span>
      </div>

      <div className="summary-total">
        <span>Total Amount:</span>
        <span>${finalTotal.toFixed(2)}  </span>
      </div>
    </div>
  );
}
