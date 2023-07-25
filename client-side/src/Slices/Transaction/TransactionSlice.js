import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://us-central1-hydra-express.cloudfunctions.net/app';


const getAccessTokenFromState = (getState) => {
  const { token } = getState().auth; 
  return token;
};

const createAxiosInstance = (getState) => {
  const token = getAccessTokenFromState(getState);
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'hydra-express-access-key': token,
    },
  });
};


const fetchAllTransactions = createAsyncThunk('transaction/fetchAllTransactions', async (_, { getState }) => {
  try {
    const axiosInstance = createAxiosInstance(getState);
    const response = await axiosInstance.get('/user/transactions');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const fetchTransactionsByType = createAsyncThunk(
  'transaction/fetchTransactionsByType',
  async (transactionType, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      const response = await axiosInstance.get(`/user/transactions/via/type?type=${transactionType}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


const fetchTransactionsByStatus = createAsyncThunk(
  'transaction/fetchTransactionsByStatus',
  async (transactionStatus, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      const response = await axiosInstance.get(
        `/user/transactions/via/transaction/status?transaction_status=${transactionStatus}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


const fetchTransactionByUniqueId = createAsyncThunk(
  'transaction/fetchTransactionByUniqueId',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      const response = await axiosInstance.get(`/user/transaction?unique_id=${uniqueId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to make a payment deposit transaction
const makePaymentDeposit = createAsyncThunk(
  'transaction/makePaymentDeposit',
  async ({ amount, payment_method, reference }, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.post('/user/transaction/payment/deposit', { amount, payment_method, reference });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to cancel a payment deposit transaction
const cancelPaymentDeposit = createAsyncThunk(
  'transaction/cancelPaymentDeposit',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.put('/user/transaction/cancel/deposit', { unique_id: uniqueId });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to complete a payment deposit transaction
const completePaymentDeposit = createAsyncThunk(
  'transaction/completePaymentDeposit',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.put('/user/transaction/complete/deposit', { unique_id: uniqueId });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to make a payment withdrawal transaction
const makePaymentWithdrawal = createAsyncThunk(
  'transaction/makePaymentWithdrawal',
  async ({ amount, payment_method }, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.post('/user/transaction/payment/withdrawal', { amount, payment_method });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to cancel a payment withdrawal transaction
const cancelPaymentWithdrawal = createAsyncThunk(
  'transaction/cancelPaymentWithdrawal',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.put('/user/transaction/cancel/withdrawal', { unique_id: uniqueId });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to complete a payment withdrawal transaction
const completePaymentWithdrawal = createAsyncThunk(
  'transaction/completePaymentWithdrawal',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.put('/user/transaction/complete/withdrawal', { unique_id: uniqueId });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to delete a transaction
const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (uniqueId, { getState }) => {
    try {
      const axiosInstance = createAxiosInstance(getState);
      await axiosInstance.delete('/user/transaction', {
        data: { unique_id: uniqueId },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the Redux slice for transactions
const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactionsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByType.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTransactionsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactionsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByStatus.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTransactionsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactionByUniqueId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionByUniqueId.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTransactionByUniqueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(makePaymentDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePaymentDeposit.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(makePaymentDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelPaymentDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelPaymentDeposit.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelPaymentDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completePaymentDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completePaymentDeposit.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(completePaymentDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(makePaymentWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePaymentWithdrawal.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(makePaymentWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelPaymentWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelPaymentWithdrawal.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelPaymentWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completePaymentWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completePaymentWithdrawal.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(completePaymentWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchAllTransactions,
  fetchTransactionsByType,
  fetchTransactionsByStatus,
  fetchTransactionByUniqueId,
  makePaymentDeposit,
  cancelPaymentDeposit,
  completePaymentDeposit,
  makePaymentWithdrawal,
  cancelPaymentWithdrawal,
  completePaymentWithdrawal,
  deleteTransaction,
};

export default transactionSlice.reducer;
