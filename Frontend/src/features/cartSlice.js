import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
    setItems: (state, action) => {
        state.items = action.payload;
    },
    deleteItem: (state, action) => {
        state.items = state.items.filter(item => item.id != action.payload.id);
    }
  },
});

export const { setLoading, setError, setToggle, addItem, setItems, deleteItem } = cartSlice.actions;

export function fetchCartItems(buyer_id) {
  return async function (dispatch) {
    dispatch(setLoading(true))

      try {
        console.log("Fetching cart items");
        const res = await axios.post("/api/cart/getItems", { buyer_id });
        dispatch(setItems(res.data));
        console.log("Cart items fetched:", res.data); 
      } catch (err) {
        console.log(err.message)
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
  }
}

export function addCartItem(cartItem) {
  return async function (dispatch) {
    dispatch(setLoading(true));

    try {
      console.log("Adding item to cart:", cartItem);
      const res = await axios.post("/api/cart/add", cartItem);
      dispatch(addItem(cartItem)); // Update the state with the new item
    } catch (err) {
      console.error("Error adding item to cart:", err);
      dispatch(setError(err.message));
      alert(`Failed to add item to cart. ${err.message}`);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteCartItem(cart_id) {
  return async function (dispatch) {
    dispatch(setLoading(true));

  try {
    const res = await axios.delete(`/api/cart/delete/${cart_id}`);
    dispatch(deleteItem({ id: cart_id }));
  } catch (err) {
    console.error("Error adding item to cart:", err);
    dispatch(setError(err.message));
    alert(`Failed to delete item from cart. ${err.message}`);
  } finally {
    dispatch(setLoading(false));
  }
}
}

export default cartSlice.reducer