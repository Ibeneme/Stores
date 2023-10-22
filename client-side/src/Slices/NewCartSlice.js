

import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
};

const newCartSlice = createSlice({
  name: 'newCart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
     localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addItem } = newCartSlice.actions;

export default newCartSlice.reducer;
