import { useEffect, useRef } from "react";
import "../../pages/Login/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  signupFailure,
  signupSuccess,
} from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { clearCart } from "../../store/slice/cartSlice";
import { syncGetCart } from "../../store/slice/cartAPI";
export default function SignUpForm() {
  const dispatch = useDispatch();
  const go = useNavigate();
  const { error } = useSelector((state) => state.user);

  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      firstName: fNameRef.current.value,
      lastName: lNameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    if (passRef.current.value !== confirmPassRef.current.value) {
      dispatch(signupFailure("Passwords do not match"));
      return;
    } else {
      try {
        const res = await api.post("auth/register", data);
        dispatch(
          signupSuccess({ token: res.data.token || "token", user: res.data })
        );
        dispatch(clearCart());
        dispatch(syncGetCart());
        go("/shop", { replace: true });
      } catch (err) {
        dispatch(signupFailure("Something went wrong: " + err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" placeholder="First Name" ref={fNameRef} required />
      <input type="text" placeholder="Last Name" ref={lNameRef} required />
      <input type="email" placeholder="Email" ref={emailRef} required />
      <input type="password" placeholder="Password" ref={passRef} required />
      <input
        type="password"
        placeholder="Confirm Password"
        ref={confirmPassRef}
      />

      <button type="submit">Sign Up</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
