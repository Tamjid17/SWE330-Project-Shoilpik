import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    toggle: false,
    error: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addItem: (state, action) => {
        state.items.push(action.payload)
    },
    deleteItem: (state, action) => {
        state.items = state.items.filter(item => item.id != action.payload.id);
    }
  },
});

export const { setLoading, setError, setToggle, addItem, deleteItem } = cartSlice.actions;

export default cartSlice.reducer