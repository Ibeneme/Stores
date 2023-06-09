import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signup",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupPasscoder = createAsyncThunk(
  "signup/signupPasscoder",
  async ({ country, pid },  { rejectWithValue } ) => {
    try {
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signup/via/passcoder",
        {
          country,
          pid,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);;
    }
  }
);

const authSignUpSlice = createSlice({
  name: "authSignUp",
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(signupPasscoder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupPasscoder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupPasscoder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
  },
});

export default authSignUpSlice.reducer;
