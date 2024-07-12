import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductHistorySeller = createAsyncThunk(
    "productHistorySeller/fetchProductHistorySeller",
    async (sellerId, thunkAPI) => {
        try {
        const token = localStorage.getItem("sellerToken");
        const response = await axios.get(`/api/product/seller/${sellerId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log("API Response:", response.data); // Log the API response
        return response.data;
        } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const productHistorySellerSlice = createSlice({
    name: "productHistorySeller",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductHistorySeller.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductHistorySeller.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchProductHistorySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});


export default productHistorySellerSlice.reducer;