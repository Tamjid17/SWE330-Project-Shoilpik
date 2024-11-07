import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct the import

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('sellerUserInfo')) || {},
  token: localStorage.getItem('sellerToken') || null,
  loading: false,
  error: null
};

export const fetchSeller = createAsyncThunk(
  'seller/fetchSeller',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`/api/seller/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      const decodedToken = jwtDecode(action.payload);
      console.log("Decoded Token: ", decodedToken); // Log decoded token
      state.userInfo = decodedToken;

      localStorage.setItem('sellerToken', action.payload);
      localStorage.setItem('sellerUserInfo', JSON.stringify(decodedToken));
    },
    clearSeller: (state) => {
      state.userInfo = {};
      state.token = null;

      localStorage.removeItem('sellerToken');
      localStorage.removeItem('sellerUserInfo');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('sellerUserInfo', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeller.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setToken, clearSeller, setError, setLoading, setUser } = sellerSlice.actions;

export default sellerSlice.reducer;
