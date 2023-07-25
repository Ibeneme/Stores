import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // Define the initial state here if needed
};

// Utility function to add access token to headers
const addAccessTokenToHeaders = (getState) => {
  const { token } = getState().auth;
  return {
    headers: {
      'hydra-express-access-token': token,
    },
  };
};

// Async thunk to fetch KYC data
const fetchKYCData = createAsyncThunk('kyc/fetchKYCData', async (_, { getState }) => {
  try {
    const response = await axios.get(
      'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc',
      addAccessTokenToHeaders(getState)
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async thunk to add KYC data via PID
const addKYCDataViaPID = createAsyncThunk(
  'kyc/addKYCDataViaPID',
  async ({ kyc_type, pid }, { getState }) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/add/via/pid',
        { kyc_type, pid },
        addAccessTokenToHeaders(getState)
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk to edit KYC data
const editKYCData = createAsyncThunk(
  'kyc/editKYCData',
  async ({ kyc_type, nin, bvn, proof_type, proof }, { getState }) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/edit',
        { kyc_type, nin, bvn, proof_type, proof },
        addAccessTokenToHeaders(getState)
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk to edit KYC data via PID
const editKYCDataViaPID = createAsyncThunk(
  'kyc/editKYCDataViaPID',
  async ({ kyc_type, pid }, { getState }) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/edit/via/pid',
        { kyc_type, pid },
        addAccessTokenToHeaders(getState)
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk to edit KYC proof
const editKYCProof = createAsyncThunk('kyc/editKYCProof', async ({ proof }, { getState }) => {
  try {
    const response = await axios.post(
      'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/edit/proof',
      { proof },
      addAccessTokenToHeaders(getState)
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKYCData.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKYCData.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        state.kycData = action.payload; // Assuming the fetched data is stored in the "kycData" field
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchKYCData.rejected, (state, action) => {
        // Handle rejected state if needed
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addKYCDataViaPID.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
        state.error = null;
      })
      .addCase(addKYCDataViaPID.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        state.kycData = action.payload; // Assuming the added data is stored in the "kycData" field
        state.loading = false;
        state.error = null;
      })
      .addCase(addKYCDataViaPID.rejected, (state, action) => {
        // Handle rejected state if needed
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editKYCData.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
        state.error = null;
      })
      .addCase(editKYCData.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        state.kycData = action.payload; // Assuming the edited data is stored in the "kycData" field
        state.loading = false;
        state.error = null;
      })
      .addCase(editKYCData.rejected, (state, action) => {
        // Handle rejected state if needed
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editKYCDataViaPID.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
        state.error = null;
      })
      .addCase(editKYCDataViaPID.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        state.kycData = action.payload; // Assuming the edited data via PID is stored in the "kycData" field
        state.loading = false;
        state.error = null;
      })
      .addCase(editKYCDataViaPID.rejected, (state, action) => {
        // Handle rejected state if needed
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editKYCProof.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
        state.error = null;
      })
      .addCase(editKYCProof.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        state.kycData = action.payload; // Assuming the edited proof data is stored in the "kycData" field
        state.loading = false;
        state.error = null;
      })
      .addCase(editKYCProof.rejected, (state, action) => {
        // Handle rejected state if needed
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchKYCData, addKYCDataViaPID, editKYCData, editKYCDataViaPID, editKYCProof };
export default kycSlice.reducer;
