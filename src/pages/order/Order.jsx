import React, { useEffect, useState } from "react";
import "./order.css"; // Styles file
import Stepper from "./stepper";
import ShippingForm from "./ShippingForm";
import PaymentOptions from "./paymentOptions";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import { clearCart } from "../../store/slice/cartSlice";
import { useNavigate } from "react-router-dom";
export default function OrderPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { user, token } = useSelector((state) => state.user);
  const SUB_TOTAL = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const SHIPPING_COST = 15;
  const FINAL_TOTAL = SUB_TOTAL + SHIPPING_COST;

  const STEPS = ["Shipping Info", "Payment Options", "Order Confirmation"];
  useEffect(() => {
    if (cartItems.length === 0 && currentStep !== 3) {
      setCurrentStep(1);
    }
  }, [cartItems, currentStep]);
  const handleShippingSubmit = (info) => {
    setShippingInfo(info);
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        address: shippingInfo.address,
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: Number(FINAL_TOTAL.toFixed(2)),
      };

      const res = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        setCurrentStep(3);
        dispatch(clearCart());
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    }
  };
  return (
    <div className="order-page">
      <h1 className="page-title">🛒 Checkout</h1>

      <Stepper currentStep={currentStep} steps={STEPS} />

      <div className="order-layout">
        {/* Main Content Column */}
        <div className="main-content">
          {currentStep === 1 && (
            <ShippingForm
              initial={shippingInfo}
              onSubmit={handleShippingSubmit}
            />
          )}
          {currentStep === 2 && (
            <PaymentOptions
              finalTotal={FINAL_TOTAL.toFixed(2)}
              setPaymentMethod={setPaymentMethod}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
          {/* Confirmation Screen */}
          {currentStep === 3 && (
            <div className="confirmation-card">
              <h2>🎉 Thank You for Your Order!</h2>
              <p>
                Your order has been successfully placed. We will prepare and
                ship it soon
              </p>
              <p className="order-number">Order Number: **#123456**</p>
              <button
                onClick={() => navigate("/shop")}
                className="cta-button secondary"
              >
                Return to Store
              </button>
            </div>
          )}
        </div>

        {/* Sidebar (Order Summary) */}
        <div className="sidebar">
          <OrderSummary
            products={cartItems}
            subtotal={SUB_TOTAL}
            shippingCost={SHIPPING_COST}
            finalTotal={FINAL_TOTAL}
          />
        </div>
      </div>
    </div>
  );
}
