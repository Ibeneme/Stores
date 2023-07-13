import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Create an async thunk to update the user's name
export const updateProfileName = createAsyncThunk(
  "profileName/updateProfileName",
  async (nameData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/name",
        nameData,
        { headers }
      );
     
      return response.data;
    } catch (error) {
    
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update the user's phone number
export const updateProfilePhone = createAsyncThunk(
  "profileName/updateProfilePhone",
  async (phoneNumber, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const data = {
        phone_number: phoneNumber,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/phone",
        data,
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update the user's details
export const updateProfileDetails = createAsyncThunk(
  "profileName/updateProfileDetails",
  async (detailsData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/details",
        detailsData,
        { headers }
      );
    
      return response.data;
    } catch (error) {

      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update the user's address
export const updateProfileAddress = createAsyncThunk(
  "profileName/updateProfileAddress",
  async (addressData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/address",
        addressData,
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update the user's bank account
export const updateProfileBankAccount = createAsyncThunk(
  "profileName/updateProfileBankAccount",
  async (bankAccountData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/bank/account",
        bankAccountData,
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk to update the user's photo
export const updateProfilePhoto = createAsyncThunk(
  "profileName/updateProfilePhoto",
  async (photo, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice

      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/photo",
        photo,
        { headers }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const profileNameSlice = createSlice({
  name: "profileName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileName.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileName.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfileName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
   
      })
      .addCase(updateProfilePhone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfilePhone.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfilePhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileDetails.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      })
      .addCase(updateProfileAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfileAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileBankAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileBankAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfileBankAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfilePhoto.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      
      });
  },
});

// Export the async thunks and reducer
export const { actions } = profileNameSlice;
export default profileNameSlice.reducer;
