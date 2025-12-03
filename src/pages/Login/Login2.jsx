import { useState } from "react";
import "./login.css";
import backgroundImg from "./background.jpg";
import LoginForm from "../../components/login-signup/LoginForm";
import SignUpForm from "../../components/login-signup/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/userSlice";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

export default function Login2() {
  const [switchLogin, setSwitch] = useState(true);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return isLoggedIn ? (
    <div className="already-login-container ">
      <h1>You are Already LoggedIn</h1>
      <p>Welcome back! You are already logged in.</p>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0">Username: {user.username}</p>
        <p></p>
        <p>email: {user.email}</p>
      </div>
      <button
        className="logout-btn"
        onClick={() => {
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
