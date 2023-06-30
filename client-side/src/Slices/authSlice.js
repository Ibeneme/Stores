import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import jwtDecode from "jwt-decode";
import firebase from "firebase/compat/app";
import "firebase/auth";
import firebaseConfig from "../Firebase/firebaseConfig";

firebase.initializeApp(firebaseConfig);

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const userData = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  token,
  userData,
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
      console.log(response);

      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);



export const registerUserViaPasscoder = createAsyncThunk(
  "auth/registerUserViaPasscoder",
  async (userSignUp, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/auth/user/signup/via/passcoder`,
        {
          country: userSignUp.country,
          pid: userSignUp.country,
        }
      );

      const token = response.data.token;
      console.log(response);

      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "verification/resendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/email/verify",
        { email }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const sendPasswordResetEmail = createAsyncThunk(
  "forgotPassword/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/user/password/reset/email`, {
        email,
      });
      return console.log(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      const token = response.data.data.token;
      console.log(response);

      localStorage.setItem("response", JSON.stringify(response.data.data));
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/user/signout`, {
        email: user.email,
        password: user.password,
      });
      const token = response.data.data.token;
      console.log(response);
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserViaPasscoder = createAsyncThunk(
  "auth/loginUserViaPasscoder",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/user/signin/via/pid`, {
        pid: user.pid,
      });
      const token = response.data.data.token;
      console.log(response);
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      return token;
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
    signInWithGoogle(state, action) {
      state.name = action.payload.name;
      state.picture = action.payload.picture;
      localStorage.setItem("name", JSON.stringify(state.name));
      localStorage.setItem("picture", JSON.stringify(state.picture));
    },
    // userProfile(state, action) {
    //   state.userData = action.payload;
    //   localStorage.setItem("userData", JSON.parse(state.userData));
    //   console.log(state.userData);
    // },

    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);

        return {
          ...state,
          token,
          userLoaded: true,
          userData,
        };
      } else return { ...state, userLoaded: false };
    },


    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
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
        console.log(user);
        return {
          ...state,
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

    builder.addCase(logOutUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        console.log(user);
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
    builder.addCase(logOutUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(registerUserViaPasscoder.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUserViaPasscoder.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        console.log(user);
        return {
          ...state,
          token: action.payload,
          country: user.country,
          pid: user.pid,
          _id: user._id,
          userLoaded: true,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUserViaPasscoder.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "lol" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);

        console.log(user);
        return {
          ...state,
          token: action.payload,
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
    builder.addCase(loginUserViaPasscoder.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUserViaPasscoder.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        console.log(user);
        return {
          ...state,
          token: action.payload,
          pid: user.pid,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUserViaPasscoder.rejected, (state, action) => {
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

 
    builder.addCase(signInWithGoogle.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        const { name, picture } = user; // Extract name and picture from the decoded user object

        // Save name and picture to localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("picture", picture);
        return {
          ...state,
          token: action.payload,
          email: user.email,
          password: user.password,
          dob: user.dob,
          name, // Save name to Redux state
          picture, // Save picture to Redux state
          loginStatus: "success",
        };
      } else return state;
    });

    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(sendVerificationEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(sendVerificationEmail.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(sendVerificationEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });

    builder
      .addCase(sendPasswordResetEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.successMessage = action.payload.message;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
