
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const PIDsignupSlice = createSlice({
  name: "PIDsignup",
  initialState,
  reducers: {
    PIDsignupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    PIDsignupSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    PIDsignupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { PIDsignupRequest, PIDsignupSuccess, PIDsignupFailure } = PIDsignupSlice.actions;

export default PIDsignupSlice.reducer;
