import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    items: [],
    loading: false,
    error: null,
}
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
    },
});

export function 

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;