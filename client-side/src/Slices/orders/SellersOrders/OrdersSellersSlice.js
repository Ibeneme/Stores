import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const ACCESS_KEY = "passcoder_1853cef81fea126373d2"; Replace with your access key

const fetchOrdersInternal = createAsyncThunk(
  "ordersInternal/fetchOrdersInternal",
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };

      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders",
        config // Pass the headers as the second argument
      );

      // Log the response
      console.log("fetchOrdersInternal response:", response.data);

      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle the error here or re-throw it with a customized message if needed
      console.error("Error fetching orders:", error);
      throw error; // You can throw a custom error message if needed: `throw new Error("Custom error message");`
    }
  }
);

// Create an async thunk to mark an order as shipped
const markOrderAsShipped = createAsyncThunk(
  "ordersInternal/markOrderAsShipped",
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
        order_unique_id: order_unique_id,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/shipping",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

const markOrderAsShippedMain = createAsyncThunk(
  "ordersInternal/markOrderAsShippedMain",
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
        order_unique_id: order_unique_id,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/shipped",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

// const markOrderAsShipped = createAsyncThunk(
//   "ordersInternal/markOrderAsShipped",
//   async (_, { getState }) => {
//     try {
//       const { token } = getState().auth;

//       const config = {
//         headers: {
//           "hydra-express-access-token": token,
//         },
//       };

//       // Make the API call to mark an order as shipped
//       const response = await axios.get(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/shipped",

//         config // Pass the headers as the third argument
//       );

//       // Log the response
//       console.log("markOrderAsShipped response:", response.data);
//     } catch (error) {
//       // If an error occurs, throw the error message
//       throw error.response.data;
//     }
//   }
// );

// Create an async thunk to mark an order as completed
// const markOrderAsCompleted = createAsyncThunk(
//   "ordersInternal/markOrderAsCompleted",
//   async (_, { getState }) => {
//     try {
//       const { token } = getState().auth;

//       const config = {
//         headers: {
//           "hydra-express-access-token": token,
//           "hydra-express-access-key": "passcoder_1853cef81fea126373d2",
//         },
//       };

//       // Make the API call to mark an order as completed
//       const response = await axios.get(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/completed",

//         config // Pass the headers as the third argument
//       );

//       // Log the response
//       console.log("markOrderAsCompleted response:", response.data);
//     } catch (error) {
//       // If an error occurs, throw the error message
//       throw error.response.data;
//     }
//   }
// );

const markOrderAsCompleted = createAsyncThunk(
  "ordersInternal/markOrderAsCompleted",
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
        order_unique_id: order_unique_id,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/completed",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);
const markAsReceived = createAsyncThunk(
  "ordersInternal/markAsReceived",
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
        order_unique_id: order_unique_id,
      };

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/completed",
        data,
        config
      );

      console.log("markOrderAsShipped response:", response.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

const fetchOrderDetails = createAsyncThunk(
  "ordersInternal/fetchOrderDetails",
  async (unique_id, { getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/seller/order?unique_id=${unique_id}`,
        config
      );
      console.log("fetchOrderDetails response:", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const fetchShippedOrders = createAsyncThunk(
  "ordersInternal/fetchShippedOrders",
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };

      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders/shipped?shipped=true",
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "shipped");
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch disputed orders
const fetchDisputedOrders = createAsyncThunk(
  "ordersInternal/fetchDisputedOrders",
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };

      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders/disputed?disputed=true",
        config
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch paid orders
const fetchPaidOrders = createAsyncThunk(
  "ordersInternal/fetchPaidOrders",
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };

      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders/paid?paid=true",
        config
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const ordersInternalSlice = createSlice({
  name: "ordersInternal",
  initialState: {
    ordersInternalData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersInternal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersInternal.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersInternal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(markOrderAsShipped.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markOrderAsShipped.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(markAsReceived.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markAsReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(markOrderAsShippedMain.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markOrderAsShippedMain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(markOrderAsCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markOrderAsCompleted.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(markOrderAsCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchShippedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippedOrders.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchShippedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDisputedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisputedOrders.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDisputedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchOrdersInternal,
  markOrderAsShipped,
  markOrderAsShippedMain,
  markOrderAsCompleted,
  markAsReceived,
  fetchOrderDetails,
  fetchPaidOrders,
  fetchShippedOrders,
  fetchDisputedOrders,
};

export default ordersInternalSlice.reducer;
