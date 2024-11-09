import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOneProduct = createAsyncThunk(
    'oneProduct/fetchOneProduct',
    async (product_id) => {
        const response = await fetch(`/api/product/${product_id}`);
        const data = await response.json();
        return data; 
    }
);

const oneProductSlice = createSlice({
    name: 'oneProduct',
    initialState: {
        product: null,  
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOneProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOneProduct.fulfilled, (state, action) => {
                state.product = action.payload;  
                state.status = 'succeeded';
            })
            .addCase(fetchOneProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default oneProductSlice.reducer;
