import { useEffect, useRef } from "react";
import "../../pages/Login/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginFailure,
  loginSuccess,
} from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { clearCart } from "../../store/slice/cartSlice";
import { syncGetCart } from "../../store/slice/cartAPI";
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

    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data?.token || null;
      const user = res.data?.user || null;

      if (token && user) {
        dispatch(loginSuccess({ token, user }));
        dispatch(clearCart());
        dispatch(syncGetCart());
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
