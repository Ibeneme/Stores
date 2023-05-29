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
