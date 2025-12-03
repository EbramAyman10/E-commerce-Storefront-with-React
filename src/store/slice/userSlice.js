import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../api/axios";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    isLoggedIn: !!tokenFromStorage,
    token: tokenFromStorage || null,
    error: null,
  },
  reducers: {
    //login
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      setAuthToken(action.payload.token);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },

    //signup
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.isLoggedIn = !!action.payload.token;
      state.error = null;

      if (action.payload.token)
        localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    signupFailure: (state, action) => {
      state.error = action.payload;
    },
    ///////////

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  logout,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
