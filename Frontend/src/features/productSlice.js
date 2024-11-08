import { createSlice } from "@reduxjs/toolkit";
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
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;

export function fetchProducts() {
    return async function (dispatch) {
        dispatch(setLoading(true))

        try {
          // Log the request
          console.log("Fetching products...");
          const res = await axios.get("api/product/");

          dispatch(setProducts(res.data)); // Dispatch the products
        } catch (err) {
          dispatch(setError(err.message));
          console.log(err.message);
        } finally {
          dispatch(setLoading(false));
        }
    }
}

export default productSlice.reducer;