import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../api";


export const sendPasswordResetEmail = createAsyncThunk(
  "forgotPassword/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/user/password/reset/email`, { email });
      return  console.log(response) 
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    status: "idle",
    error: null,
    successMessage: null,
  },
  reducers: {
    resetForgotPasswordState: (state) => {
      state.status = "idle";
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPasswordResetEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.successMessage = action.payload.message;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
