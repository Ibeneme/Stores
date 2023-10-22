// import { createSlice } from '@reduxjs/toolkit';
// import firebase from '../Firebase/firebaseConfig';

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// const googleAuthSlice = createSlice({
//   name: 'googleAuth',
//   initialState,
//   reducers: {
//     signInWithGoogleStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
//     signInWithGoogleSuccess(state, action) {
//       state.isLoading = false;
//       state.user = action.payload;
//       state.error = null;
//       localStorage.setItem('token', action.payload.token);
//     },
//     signInWithGoogleFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     signOutStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
//     signOutSuccess(state) {
//       state.isLoading = false;
//       state.user = null;
//       state.error = null;
//     },
//     signOutFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   signInWithGoogleStart,
//   signInWithGoogleSuccess,
//   signInWithGoogleFailure,
//   signOutStart,
//   signOutSuccess,
//   signOutFailure,
// } = googleAuthSlice.actions;

// export const signInWithGoogle = createAsyncThunk(
//   'auth/signInWithGoogle',
//   async () => {
//     try {
//       const { user } = await auth.signInWithPopup(provider);
//       return user;
//     } catch (error) {
//       throw new Error('Error signing in with Google.');
//     }
//   }
// );


// export const signOut = () => async (dispatch) => {
//   dispatch(signOutStart());
//   try {
//     await firebase.auth().signOut();
//     dispatch(signOutSuccess());
//     console.log('Signed out successfully');
//   } catch (error) {
//     const errorMessage = error.message || 'Error signing out';
//     dispatch(signOutFailure(errorMessage));
//     console.error('Error signing out:', errorMessage);
//   }
// };

// export const selectUser = (state) => state.googleAuth.user;
// export const selectIsLoading = (state) => state.googleAuth.isLoading;
// export const selectError = (state) => state.googleAuth.error;

// export default googleAuthSlice.reducer;
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
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`increased ${state.cartItems[itemIndex].name} product`, {
          position: "top-center",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);

        toast.success(`${action.payload.name} added a new product to cart`, {
          position: "top-center",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from the cart`, {
        position: "top-center",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
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
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error(`${action.payload.name} removed from the cart`, {
          position: "top-center",
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart(state, action){
        state.cartItems =[]
        toast.error(`You've emptied your cart`, {
            position:'top-center'
        })
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    getTotal(state, action){
      let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem)=>{
            const { price, cartQuantity } = cartItem
            const itemTotal = price * cartQuantity

            cartTotal.total += itemTotal
            cartTotal.quantity += cartQuantity

            return cartTotal

        }, {
            total: 0,
            quantity: 0
        })
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total
    }
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } = cartSlice.actions;

export default cartSlice.reducer;