
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEmailVerified: false,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    verifyEmail: (state) => {
      state.isEmailVerified = true;
    },
  },
});

export const { verifyEmail } = verificationSlice.actions;
export default verificationSlice.reducer;
