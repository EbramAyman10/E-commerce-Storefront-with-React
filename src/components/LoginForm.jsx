import { useEffectEvent, useRef } from "react";
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

  useEffectEvent(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "https://dummyjson.com/auth/login";
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    try {
      const res = await axios.post(url, data);

      if (res.data.token) {
        dispatch(loginSuccess({ token: res.data.token, user: res.data }));
        go("/shop", { replace: true });
      } else dispatch(loginFailure("Invaild Username or Password"));
    } catch (err) {
      dispatch(loginFailure("Something went wrong: " + err.message));
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="email" ref={emailRef} required />
      <input type="password" placeholder="Password" ref={passRef} required />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
