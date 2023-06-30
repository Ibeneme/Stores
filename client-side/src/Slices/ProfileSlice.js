// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';


// const token = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : null;

// const initialState = {
//     token,
//   firstname: '',
//   middlename: '',
//   lastname: '',
//   loading: false,
//   error: null,
// };

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     updateProfileStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateProfileSuccess: (state, action) => {
//       state.loading = false;
//       state.error = null;
//       state.firstname = action.payload.firstname;
//       state.middlename = action.payload.middlename;
//       state.lastname = action.payload.lastname;
//     },
//     updateProfileFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   updateProfileStart,
//   updateProfileSuccess,
//   updateProfileFailure,
// } = profileSlice.actions;

// export const updateProfile = (profileData, token) => async (dispatch) => {
//     dispatch(updateProfileStart());
  
//     try {
//       const response = await axios.put(
//         'https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/name',
//         profileData,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       );
  
//       dispatch(updateProfileSuccess(response.data));
//     } catch (error) {
//       dispatch(updateProfileFailure(error.message));
//     }
//   };
  

// export default profileSlice.reducer;
