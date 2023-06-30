import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const userData = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

export const userProfile = createAsyncThunk(
  'auth/userProfile',
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const headers = {
        'hydra-express-access-token': token,
      };
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/profile',
        { headers }
      );
      const result = response.data.data;

      localStorage.setItem('userData', JSON.stringify(response.data.data));

      console.log(result);
      console.log(JSON.stringify(response.data.data));

      return response.data.data;
    } catch (error) {
      // Handle error
      throw new Error('Failed to fetch user profile');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userProfileSlice.reducer;
