import { useEffect, useRef } from "react";
import "../pages/Login/login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginFailure,
  loginSuccess,
} from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const go = useNavigate();
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "https://dummyjson.com/auth/login";
    const data = {
      username: emailRef.current.value,
      password: passRef.current.value,
    };
    try {
      const res = await axios.post(url, data);

      dispatch(loginSuccess({ token: res.data.token, user: res.data }));
      go("/shop", { replace: true });
      // if (res.data.token) {
      // } else dispatch(loginFailure("Invaild Username or Password"));
    } catch (err) {
      dispatch(loginFailure("Something went wrong: " + err.message));
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="email" ref={emailRef} required />
      <input type="password" placeholder="Password" ref={passRef} required />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
