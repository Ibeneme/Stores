import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import jwtDecode from "jwt-decode";
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import firebaseConfig from '../Firebase/firebaseConfig';


firebase.initializeApp(firebaseConfig);

const token = localStorage.getItem("token")? localStorage.getItem('token')
: null

const initialState = {
  token,
  firstname: "",
  lastname: "",
  gender: "",
  dob: "",
  country: "",
  email: "",
  password: "",
  confirmPassword: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userSignUp, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(`${url}/auth/user/signup`, {
        email: userSignUp.email,
        firstname: userSignUp.firstname,
        lastname: userSignUp.lastname,
        gender: userSignUp.gender,
        dob: userSignUp.dob,
        country: userSignUp.country,
        password: userSignUp.password,
        confirmPassword: userSignUp.confirmPassword,
      });

      const token = response.data.token;
      console.log(response)
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/user/signin/via/email`, {
        email: user.email,
        password: user.password,
      });
      const token = response.data.token;
      console.log(response)
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const { uid, displayName, email } = result.user;
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      return { uid, displayName, email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${url}/user/${id}`, setHeaders());

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          email: user.email,
          password: user.password,
          _id: user._id,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        country: "",
        email: "",
        password: "",
        confirmPassword: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          gender: user.gender,
          dob: user.dob,
          country: user.country,
          password: user.password,
          confirmPassword: user.confirmPassword,
          _id: user._id,
          userLoaded: true,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          email: user.email,
          password: user.password,
          _id: user._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          email: user.email,
          password: user.password,
          _id: user._id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  
      builder
        .addCase(signInWithGoogle.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signInWithGoogle.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(signInWithGoogle.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
 
  },
});
export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;


