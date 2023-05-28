import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for requesting password reset email
export const requestPasswordResetEmail = createAsyncThunk(
  'auth/requestPasswordResetEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/password/reset/email',
        {
          email
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the forgot password slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    error: null,
    success: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestPasswordResetEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(requestPasswordResetEmail.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(requestPasswordResetEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default forgotPasswordSlice.reducer;
