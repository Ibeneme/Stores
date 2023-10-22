// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : []};

// const newCartSlice = createSlice({
//   name: "newCart",
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const existingItemIndex = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (existingItemIndex !== -1) {
//         // Item already exists, increment its quantity
//         state.items[existingItemIndex].quantity += 1;
//       } else {
//         // Add a new item with a quantity of 1
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//     removeItem: (state, action) => {
//       const index = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.items.splice(index, 1);
//         localStorage.setItem("cartItems", JSON.stringify(state.items));
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cartItems");
//     },
//     reduceItemQuantity: (state, action) => {
//       const index = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       if (index !== -1 && state.items[index].quantity > 1) {
//         state.items[index].quantity -= 1;
//         localStorage.setItem("cartItems", JSON.stringify(state.items));
//       }
//     },
//   },
// });

// // Selectors to calculate price and total price
// export const selectCartItems = (state) => state.newCart.items;
// export const selectTotalPrice = (state) => {
//   return state.newCart.items.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);
// };

// export const { addItem, removeItem, clearCart, reduceItemQuantity } =
//   newCartSlice.actions;

// export default newCartSlice.reducer;
