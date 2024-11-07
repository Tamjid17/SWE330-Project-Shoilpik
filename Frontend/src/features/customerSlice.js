import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Using named import

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`/api/customer/profile`, {
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

export const customerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      const decodedToken = jwtDecode(action.payload);
      console.log("Decoded Token: ", decodedToken); // Log decoded token
      state.userInfo = decodedToken;

      localStorage.setItem('token', action.payload);
      localStorage.setItem('userInfo', JSON.stringify(decodedToken));
    },
    clearUser: (state) => {
      state.userInfo = {};
      state.token = null;

      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setToken, clearUser, setError, setLoading, setUser } = customerSlice.actions;

export default customerSlice.reducer;
