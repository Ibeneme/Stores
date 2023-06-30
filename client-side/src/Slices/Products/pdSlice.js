// // pdSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   product: null,
//   isLoading: false,
//   error: null,
// };

// const pdSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     getProductByIdStart(state) {
//       state.isLoading = true;
//     },
//     getProductByIdSuccess(state, action) {
//       state.isLoading = false;
//       state.product = action.payload;
//     },
//     getProductByIdFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   getProductByIdStart,
//   getProductByIdSuccess,
//   getProductByIdFailure,
// } = pdSlice.actions;

// export default pdSlice.reducer;
