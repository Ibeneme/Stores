


// import { createSlice } from '@reduxjs/toolkit'

// const initialState = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : { cartItems: []}

// const cartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//  addToCart:(state, action)=>{
//     const item = action.payload
//     const existItem = state.cartItem.find((x)=> unique_id === item.unique_id)

//     if(existItem){
//         state.cartItems = state.cartItems.map((x) => x.unique_id === existItem.unique_id? item:x)
//     } else {
//         state.cartItems = [...state,cartItems, item]
//     }
//     state.itemsPrice = state.cartItems.reduce((acc, item )=> acc + item.price + item.qty, 0)
//  }
//     }
// })


// export default cartSlice.reducer