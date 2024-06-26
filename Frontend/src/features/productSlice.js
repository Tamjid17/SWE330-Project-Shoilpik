import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;