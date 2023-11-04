// Import necessary dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the slice
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch user orders
const fetchUserOrders = createAsyncThunk(
  "user/fetchUserOrders",
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      // Make the API call to fetch user orders
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/orders",
        config
      );
      console.log(response);
      // Return the data from the response
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch user orders by tracking number
const fetchUserOrdersByTrackingNumber = createAsyncThunk(
  "user/fetchUserOrdersByTrackingNumber",
  async (trackingNumber, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
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

const fetchShippedUserOrders = createAsyncThunk(
  "user/fetchShippedUserOrders",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };
    try {
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/shipped",
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const fetchUserOrderByUniqueId = createAsyncThunk(
  "user/fetchUserOrderByUniqueId",
  async (uniqueId, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      // Make the API call to fetch a user order by unique_id
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/order?unique_id=${uniqueId}`,
        config
      );
      // Return the data from the response
      console.log(response.data);
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      console.log(error);
      throw error.response.data;
    }
  }
);

// Create an async thunk to checkout a single product
const checkoutSingleProduct = createAsyncThunk(
  "user/checkoutSingleProduct",
  async (
    {
      product_unique_id,
      quantity,
      payment_method,
      shipping_unique_id,
      shipping_fee,
      to_address,
      duration,
      distance,
    },
    { getState }
  ) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
        "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
      },
    };

    try {
      // Make the API call to checkout a single product
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/checkout",
        {
          product_unique_id,
          quantity,
          payment_method,
          shipping_unique_id,
          shipping_fee,
          to_address,
          duration,
          distance,
        },
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
  "user/checkoutMultipleProducts",
  async ({ cart_unique_ids, payment_method }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;

    // Set the headers with the access token and hydra-express-access-key
    const config = {
      headers: {
        "hydra-express-access-token": token,
        "hydra-express-access-key": "passcoder_1853cef81fea126373d2", // Add the static access key here
      },
    };

    try {
      // Make the API call to checkout multiple products
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/checkout",
        { cart_unique_ids, payment_method },
        config
      );
      console.log(response);
      // Return the data from the response
      return response.data;
    } catch (error) {
      console.log(error);
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

// Create an async thunk to create an order dispute
const createOrderDispute = createAsyncThunk(
  "user/createOrderDispute",
  async ({ unique_id }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      // Make the API call to create an order dispute
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/dispute",
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

const markAsReceived = createAsyncThunk(
  "user/markAsReceived",
  async ({ order_unique_id }, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
          "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
        },
      };
      const data = {
        unique_id: order_unique_id,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/received",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

const markAsCancel = createAsyncThunk(
  "user/markAsCancel",
  async ({ order_unique_id }, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
          "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
        },
      };
      const data = {
        unique_id: order_unique_id,
      };

      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/cancel",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

const markAsDisputes = createAsyncThunk(
  "user/markAsDisputes",
  async ({ order_unique_id }, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
          "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
        },
      };
      const data = {
        unique_id: order_unique_id,
      };

      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/dispute",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateOrderPaymentMethod = createAsyncThunk(
  "user/updateOrderPaymentMethod",
  async ({ tracking_number, payment_method }, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/update/payment/method",
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

const checkOrderPaymentStatus = createAsyncThunk(
  "user/checkOrderPaymentStatus",
  async (tracking_number, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/order/payment/status?tracking_number=${tracking_number}`,
        config
      );
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

const fetchPaidUserOrders = createAsyncThunk(
  "user/fetchPaidUserOrders",
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      // Make the API call to fetch paid user orders
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/paid?paid=true",
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

const fetchDisputedUserOrders = createAsyncThunk(
  "user/fetchDisputedUserOrders",
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;
    // Set the headers with the access token
    const config = {
      headers: {
        "hydra-express-access-token": token,
      },
    };

    try {
      // Make the API call to fetch disputed user orders
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/disputed?disputed=true",
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

const cancelUserOrder = createAsyncThunk(
  "user/cancelUserOrder",
  async ({ unique_id }, { getState }) => {
    // Get the authentication token from the state
    const { token } = getState().auth;

    // Set the headers with the access token and hydra-express-access-key
    const config = {
      headers: {
        "hydra-express-access-token": token,
        "hydra-express-access-key": "passcoder_1853cef81fea126373d2", // Add the static access key here
      },
    };

    try {
      // Make the API call to cancel a user order
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/cancel",
        { unique_id },
        config
      );
      console.log(response);
      // Return the data from the response
      return response.data;
    } catch (error) {
      console.log(error);
      // If an error occurs, throw the error message
      throw error.response.data;
    }
  }
);

const deleteUserOrder = createAsyncThunk(
  "user/deleteUserOrder",
  async ({ unique_id }, { getState }) => {
    const { token } = getState().auth;

    const config = {
      headers: {
        "hydra-express-access-token": token,
        "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
      },
    };

    try {
      const response = await axios.delete(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/delete",
        { unique_id },
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async (tracking_number, { rejectWithValue, getState }) => {
    try {

      console.log(tracking_number,'trststtsac')
      const { token } = getState().auth;
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/order/pay",
        {
          tracking_number,
        },
        {
          headers: {
            "hydra-express-access-token": token,
            "hydra-express-access-key": "passcoder_1853cef81fea126373d2", // Set the headers with the access token
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ...

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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

      .addCase(markAsReceived.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsReceived.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markAsReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(markAsCancel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsCancel.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markAsCancel.rejected, (state, action) => {
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
      .addCase(checkoutMultipleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.action = action.payload;
      })
      .addCase(checkoutMultipleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

      .addCase(markAsDisputes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsDisputes.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(markAsDisputes.rejected, (state, action) => {
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
      })
      .addCase(fetchPaidUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaidUserOrders.fulfilled, (state, action) => {
        state.paidOrders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPaidUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDisputedUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisputedUserOrders.fulfilled, (state, action) => {
        state.disputedOrders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDisputedUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelUserOrder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserOrder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSuccess = true; // Update the payment success state
      })
      .addCase(payOrder.rejected, (state, action) => {
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
  fetchPaidUserOrders,
  fetchDisputedUserOrders,
  updateOrderPaymentMethod,
  checkOrderPaymentStatus,
  cancelUserOrder,
  deleteUserOrder,
  markAsReceived,
  markAsCancel,
  markAsDisputes,
};

export default usersSlice.reducer;
