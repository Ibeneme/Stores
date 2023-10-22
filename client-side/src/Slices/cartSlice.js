import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product_unique_id === action.payload.product_unique_id
      );
      if (itemIndex >= 0) {
        const itemName = state.cartItems[itemIndex].name
          ? state.cartItems[itemIndex].name
          : state.cartItems[itemIndex].product_name;
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`You Just Topped up ${itemName} in your Cart`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff",
            color: "white",
          },
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);

        toast.success(
          `${
            action.payload.name
              ? action.payload.name
              : action.payload.product_name
          } added to cart`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#007aff",
              color: "white",
            },
          }
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    nothingCarts(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product_unique_id === action.payload.product_unique_id
      );
      if (itemIndex >= 0) {
        const itemName = state.cartItems[itemIndex].name
          ? state.cartItems[itemIndex].name
          : state.cartItems[itemIndex].product_name;
        state.cartItems[itemIndex].cartQuantity =
          state.cartItems[itemIndex].cartQuantity + 0;
        console.log(itemName);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) =>
          cartItem.product_unique_id !== action.payload.product_unique_id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(
        `${
          action.payload.name
            ? action.payload.name
            : action.payload.product_name
        } removed from the cart`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: (progress) => {
            return {
              height: "5px",
              backgroundColor: "white",
              opacity: progress / 100,
            };
          },
          style: {
            backgroundColor: "#ff0000",
            color: "white",
          },
        }
      );
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.product_unique_id === action.payload.product_unique_id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(
          ` Whoops you reduced ${
            action.payload.name
              ? action.payload.name
              : action.payload.product_name
          } from the cart`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: (progress) => {
              return {
                height: "5px",
                backgroundColor: "white",
                opacity: progress / 100,
              };
            },
            style: {
              backgroundColor: "#ff0000",
              color: "white",
            },
          }
        );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) =>
            cartItem.product_unique_id !== action.payload.product_unique_id
        );
        state.cartItems = nextCartItems;
        toast.error(
          `${
            action.payload.name
              ? action.payload.name
              : action.payload.product_name
          } removed from the cart`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: (progress) => {
              return {
                height: "5px",
                backgroundColor: "white",
                opacity: progress / 100,
              };
            },
            style: {
              backgroundColor: "#ff0000",
              color: "white",
            },
          }
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`You've emptied your cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: (progress) => {
          return {
            height: "5px",
            backgroundColor: "white",
            opacity: progress / 100,
          };
        },
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
