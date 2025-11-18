import { useState } from "react";
import "./login.css";
import backgroundImg from "./background.jpg";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.email,
          password: loginData.password,
        }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
      } else {
        setError("Invalid Email or Password");
      }
    } catch {
      setError("Something went wrong!!");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpData.agree) {
      setError("You must agree to the terms.");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    alert("Sign Up submitted successfully!");
    setError("");
  };

  return (
    <div className="login-page-container">
      <div
        className={`login-content ${
          isLogin ? "login-active" : "signup-active"
        }`}
      >
        <div className="login-form">
          {isLogin ? (
            <>
              <h2>Sign In</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button type="submit">Login</button>
              </form>
              <p className="switch-text">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                  }}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={signUpData.firstName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={signUpData.lastName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, lastName: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={signUpData.confirmPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <button type="submit">Sign Up</button>
              </form>
              <p className="switch-text">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                  }}
                >
                  Login
                </span>
              </p>
            </>
          )}
          {error && <p className="error">{error}</p>}
        </div>

        <div className="login-image">
          <img src={backgroundImg} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}
