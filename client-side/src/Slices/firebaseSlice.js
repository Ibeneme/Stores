// import { createSlice } from '@reduxjs/toolkit';
// import firebase from '../Firebase/firebaseConfig';

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// const googleAuthSlice = createSlice({
//   name: 'googleAuth',
//   initialState,
//   reducers: {
//     signInWithGoogleStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
//     signInWithGoogleSuccess(state, action) {
//       state.isLoading = false;
//       state.user = action.payload;
//       state.error = null;
//       localStorage.setItem('token', action.payload.token);
//     },
//     signInWithGoogleFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     signOutStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
//     signOutSuccess(state) {
//       state.isLoading = false;
//       state.user = null;
//       state.error = null;
//     },
//     signOutFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   signInWithGoogleStart,
//   signInWithGoogleSuccess,
//   signInWithGoogleFailure,
//   signOutStart,
//   signOutSuccess,
//   signOutFailure,
// } = googleAuthSlice.actions;

// export const signInWithGoogle = createAsyncThunk(
//   'auth/signInWithGoogle',
//   async () => {
//     try {
//       const { user } = await auth.signInWithPopup(provider);
//       return user;
//     } catch (error) {
//       throw new Error('Error signing in with Google.');
//     }
//   }
// );


// export const signOut = () => async (dispatch) => {
//   dispatch(signOutStart());
//   try {
//     await firebase.auth().signOut();
//     dispatch(signOutSuccess());
//     console.log('Signed out successfully');
//   } catch (error) {
//     const errorMessage = error.message || 'Error signing out';
//     dispatch(signOutFailure(errorMessage));
//     console.error('Error signing out:', errorMessage);
//   }
// };

// export const selectUser = (state) => state.googleAuth.user;
// export const selectIsLoading = (state) => state.googleAuth.isLoading;
// export const selectError = (state) => state.googleAuth.error;

// export default googleAuthSlice.reducer;
