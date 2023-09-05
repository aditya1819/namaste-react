import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      // mutating the state
      state.items.push(action.payload);
    },
    removeItem: (state, _action) => {
      // TODO
      state.items.pop();
    },
    clearCart: (state, _action) => {
      state.items.length = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
