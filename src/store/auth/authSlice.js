import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // authenticated, not-authenticated, checking
    user: {},
    errorMessage: null
  },
  reducers: {
    onChecking: state => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload = null }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: state => {
      state.errorMessage = null;
    }
  }
});
