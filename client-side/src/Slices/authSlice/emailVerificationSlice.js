import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendEmailVerification } from '../../Firebase/firebaseConfig';

// Create an async thunk to handle the API request
export const sendVerificationEmail = createAsyncThunk(
  'verification/resendEmail',
  async (_, { getState }) => {
    const { email } = getState().auth; // Assuming you have an auth slice with email information
    try {
      await sendEmailVerification(email);
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/email/verify',
        { email }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Create the verification slice
const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the async thunk
    builder.addCase(sendVerificationEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(sendVerificationEmail.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(sendVerificationEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default verificationSlice.reducer;
