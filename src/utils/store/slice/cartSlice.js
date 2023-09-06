import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const ids = state.items.map((item) => item.data.card.info.id);

      const newId = action.payload.card.info.id;

      if (!ids.includes(newId)) {
        // mutating the state
        state.items.push({ data: action.payload, count: 1 });
      } else {
        const index = state.items.findIndex(
          (item) => item.data.card.info.id === newId
        );
        state.items.at(index).count++;
      }
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;

      state.items = state.items.filter(
        (item) => item.data.card.info.id !== idToRemove.toString()
      );
    },
    clearCart: (state, _action) => {
      state.items.length = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
