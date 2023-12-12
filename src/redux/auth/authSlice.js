import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload;
    },
    clearToken: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
