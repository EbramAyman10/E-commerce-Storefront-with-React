import { useState } from "react";
import "./login.css";
import backgroundImg from "./background.jpg";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Login2() {
  const [switchLogin, setSwitch] = useState(true);

  const { isLoggedIn } = useSelector((state) => state.user);
  if (isLoggedIn) {
    return <Navigate to={"/shop"} replace />;
  }
  return (
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
