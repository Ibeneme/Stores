import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isEmailVerified: false,
  isLoading: false,
  error: null,
};

export const verifyEmail = createAsyncThunk(
  'verification/verifyEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/email/verify`,
        {
          params: {
            email: email,
          },
        }
      );

    
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default verificationSlice.reducer;
