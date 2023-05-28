
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;

export default signupSlice.reducer;
