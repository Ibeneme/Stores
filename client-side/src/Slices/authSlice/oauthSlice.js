// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import firebase from '../../Firebase/firebaseConfig';

// // Thunk action to log in with Google
// export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     const user = result.user;
//     return { success: true, user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// });

// const oauthSlice = createSlice({
//   name: 'oauth',
//   initialState: {
//     loading: false,
//     error: null,
//     user: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     // Reducer for login with Google action
//     builder.addCase(loginWithGoogle.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.success ? action.payload.user : null;
//       state.error = action.payload.success ? null : action.payload.error;
//     });
//     builder.addCase(loginWithGoogle.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export default oauthSlice.reducer;
// export const { actions } = oauthSlice;
