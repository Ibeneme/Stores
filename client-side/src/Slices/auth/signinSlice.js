import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signInViaEmail = createAsyncThunk(
  "auth/signInViaEmail",
  async ({ email, password }) => {
    const response = await axios.post(
      "https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signin/via/email",
      { email, password }
    );
    return response.data;
  }
);

const authSignInSlice = createSlice({
  name: "authSignin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInViaEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInViaEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInViaEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer

export default authSignInSlice.reducer;
