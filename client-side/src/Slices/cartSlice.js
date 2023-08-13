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
        (item) => item.unique_id === action.payload.unique_id
      );

      if (itemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[itemIndex].cartQuantity += 1;
        console.log(updatedCartItems, "console.log(tempProduct.name)");
        toast.info(`Increased product`, {
          position: "top-center",
        });

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Item does not exist in the cart, add it
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        toast.success(`Added a new product to cart`, {
          position: "top-center",
        });

        return {
          ...state,
          cartItems: [...state.cartItems, tempProduct],
        };
      }
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.unique_id !== action.payload.unique_id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`removed from the cart`, {
        position: "top-center",
      });
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.unique_id === action.payload.unique_id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(
          ` you decreased the quantity of ${action.payload.name} from the cart`,
          {
            position: "top-center",
          }
        );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.unique_id !== action.payload.unique_id
        );
        state.cartItems = nextCartItems;
        toast.error(`${action.payload.name} removed from the cart`, {
          position: "top-center",
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`You've emptied your cart`, {
        position: "top-center",
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
