import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductHistory = createAsyncThunk(
  'productHistory/fetchProductHistory',
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/order_item/buyer_id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const productHistorySlice = createSlice({
  name: 'productHistory',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductHistory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productHistorySlice.reducer;