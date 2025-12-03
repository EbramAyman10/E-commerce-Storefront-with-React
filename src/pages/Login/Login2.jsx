import { useEffect, useState } from "react";
import "./login.css";
import backgroundImg from "./background.jpg";
import LoginForm from "../../components/login-signup/LoginForm";
import SignUpForm from "../../components/login-signup/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/userSlice";
import { clearCart } from "../../store/slice/cartSlice";
import api from "../../api/axios";

export default function Login2() {
  const [switchLogin, setSwitch] = useState(true);
  const [orders, setOrders] = useState([]);
  const { isLoggedIn, user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && token) {
      const fetchOrders = async () => {
        try {
          const res = await api.get("/orders", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(res.data.data);
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        }
      };
      fetchOrders();
    }
  }, [isLoggedIn, token]);
  return isLoggedIn ? (
    <div className="already-login-container mt-5">
      <h1>You are Already LoggedIn</h1>
      <p>Welcome back! You are already logged in.</p>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0">
          Username: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
      </div>
      <div className="orders mb-4">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={order._id}>
                <strong>Order {index + 1}</strong>
                <p className={`status ${order.status}`}>
                  Status: {order.status}
                </p>
                <p className="price">Total: ${order.totalAmount.toFixed(2)}</p>

                <ul>
                  {order.products.map((p) => (
                    <li key={p.productId}>
                      <span style={{ fontWeight: "bold" }}>{p.name}</span>,
                      Quantity: {p.quantity}, Price: ${p.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          dispatch(clearCart());
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="login-page-container">
      <div
        className={`login-content ${
          switchLogin ? "login-active" : "signup-active"
        }`}
      >
        <div className="login-form">
          {switchLogin ? (
            <>
              <h2>Log In</h2>
              <LoginForm />
              <p className="switch-text">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setSwitch(false);
                  }}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <SignUpForm />
              <p className="switch-text">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setSwitch(true);
                  }}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>

        <div className="login-image">
          <img src={backgroundImg} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}
