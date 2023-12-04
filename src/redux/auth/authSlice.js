// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    // To Log in, use this reducer: setToken then redirect to home page
    setToken: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload;
    },
    // To Log out, use this reducer: clearToken then redirect to login page or home page
    clearToken: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
