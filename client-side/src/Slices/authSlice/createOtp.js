import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for generating OTP
export const generateOTP = createAsyncThunk(
  'auth/generateOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/otp/create',
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the OTP slice
const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    error: null,
    otp: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otp = null;
    });
    builder.addCase(generateOTP.fulfilled, (state, action) => {
      state.loading = false;
      state.otp = action.payload;
    });
    builder.addCase(generateOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.otp = null;
    });
  },
});

export default otpSlice.reducer;
