// Import necessary dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

// Define the initial state for the slice
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch user orders
const fetchUserOrders = createAsyncThunk(
  'user/fetchUserOrders',
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to fetch user orders
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/orders',
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch user orders by tracking number
const fetchUserOrdersByTrackingNumber = createAsyncThunk(
  'user/fetchUserOrdersByTrackingNumber',
  async (trackingNumber, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to fetch user orders by tracking number
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/via/tracking?tracking_number=${trackingNumber}`,
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch shipped user orders
const fetchShippedUserOrders = createAsyncThunk(
  'user/fetchShippedUserOrders',
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to fetch shipped user orders
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/shipped?shipped=true',
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch a user order by unique_id
const fetchUserOrderByUniqueId = createAsyncThunk(
  'user/fetchUserOrderByUniqueId',
  async (uniqueId, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to fetch a user order by unique_id
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/order?unique_id=${uniqueId}`,
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to checkout a single product
const checkoutSingleProduct = createAsyncThunk(
  'user/checkoutSingleProduct',
  async ({ product_unique_id, quantity, payment_method, shipping_unique_id, shipping_fee, to_address, duration, distance }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to checkout a single product
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/order/checkout',
        { product_unique_id, quantity, payment_method, shipping_unique_id, shipping_fee, to_address, duration, distance },
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to checkout multiple products
const checkoutMultipleProducts = createAsyncThunk(
  'user/checkoutMultipleProducts',
  async ({ cart_unique_ids, payment_method }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to checkout multiple products
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/checkout',
        { cart_unique_ids, payment_method },
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to create an order dispute
const createOrderDispute = createAsyncThunk(
  'user/createOrderDispute',
  async ({ unique_id }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to create an order dispute
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/order/dispute',
        { unique_id },
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to update order payment method
const updateOrderPaymentMethod = createAsyncThunk(
  'user/updateOrderPaymentMethod',
  async ({ tracking_number, payment_method }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to update order payment method
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/order/update/payment/method',
        { tracking_number, payment_method },
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to check order payment status
const checkOrderPaymentStatus = createAsyncThunk(
  'user/checkOrderPaymentStatus',
  async (tracking_number, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth; 
    // Set the headers with the access token
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      // Make the API call to check order payment status
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/order/payment/status?tracking_number=${tracking_number}`,
        config
      );
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Export the users slice, including all the async thunks and endpoints
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserOrdersByTrackingNumber
      .addCase(fetchUserOrdersByTrackingNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersByTrackingNumber.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserOrdersByTrackingNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchShippedUserOrders
      .addCase(fetchShippedUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippedUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchShippedUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserOrderByUniqueId
      .addCase(fetchUserOrderByUniqueId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrderByUniqueId.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserOrderByUniqueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle checkoutSingleProduct
      .addCase(checkoutSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutSingleProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkoutSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle checkoutMultipleProducts
      .addCase(checkoutMultipleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutMultipleProducts.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkoutMultipleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createOrderDispute
      .addCase(createOrderDispute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderDispute.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrderDispute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateOrderPaymentMethod
      .addCase(updateOrderPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderPaymentMethod.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrderPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle checkOrderPaymentStatus
      .addCase(checkOrderPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOrderPaymentStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkOrderPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunks
export {
  fetchUserOrders,
  fetchUserOrdersByTrackingNumber,
  fetchShippedUserOrders,
  fetchUserOrderByUniqueId,
  checkoutSingleProduct,
  checkoutMultipleProducts,
  createOrderDispute,
  updateOrderPaymentMethod,
  checkOrderPaymentStatus,
  // Add other async thunks here...
};

// Export the users slice reducer
export default usersSlice.reducer;
