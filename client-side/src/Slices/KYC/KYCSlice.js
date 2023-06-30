import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc";


export const performKYCVerification = createAsyncThunk(
    "kyc/performKYCVerification",

    async (_, { rejectWithValue, getState } ) => {
      try {
        
        const token = getState().auth.token;
        console.log(getState().auth)
  console.log(token)

  const headers = {
    "hydra-express-access-token": token,
  };
        const response = await axios.get(API_URL, {
          headers
        });
  
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

// Slice
const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performKYCVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(performKYCVerification.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(performKYCVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Error occurred while performing KYC verification.";
        state.success = false;
      });
  },
});

export default kycSlice.reducer;
