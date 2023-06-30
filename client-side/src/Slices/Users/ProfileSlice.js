import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// Create an async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile",
        { headers }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update user profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile",
        profileData,
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunks and reducer
export const { actions } = profileSlice;
export default profileSlice.reducer;
