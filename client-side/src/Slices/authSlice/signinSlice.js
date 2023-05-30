// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../Firebase/firebaseConfig'; // Import your Firebase instance

// // Async thunk for signing in
// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await auth.signInWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       // Customize the response data if needed
//       const response = {
//         id: user.uid,
//         email: user.email,
//         // Add other user data as needed
//       };
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Create the auth slice
// const signInSlice = createSlice({
//   name: 'signIn',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(signInUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(signInUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     });
//     builder.addCase(signInUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export default signInSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signin/via/email', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(signinUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  },
});

export default signinSlice.reducer;
