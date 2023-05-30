import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem('token'),
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
      const token = await axios.post(`${url}/auth/user/signup`, {
        email: userSignUp.email,
        firstname: userSignUp.firstname,
        lastname: userSignUp.lastname,
        gender: userSignUp.gender,
        dob: userSignUp.dob,
        country: userSignUp.country,
        password: userSignUp.password,
        confirmPassword: userSignUp.confirmPassword,
      });

     
      localStorage.setItem("token", token.data);
      return token.data;

    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const userSignUp = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload,
          firstname: userSignUp.firstname,
          lastname: userSignUp.lastname,
          email: userSignUp.email,
          _id: userSignUp._id,
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
  },
});

export default authSlice.reducer;
