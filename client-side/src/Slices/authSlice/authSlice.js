import { createSlice } from '@reduxjs/toolkit';
import { auth, googleAuthProvider } from '../../Firebase/firebaseConfig';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      const { displayName, phoneNumber, photoURL,uid, email } = action.payload;
      state.user = { displayName, phoneNumber, photoURL, uid, email };
      localStorage.setItem('user', JSON.stringify(state.user)); // Save the filtered user object to localStorage
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove the user object from localStorage
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async login action with Google OAuth
export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const userCredential = await auth.signInWithPopup(googleAuthProvider);
    const user = userCredential.user;
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;
