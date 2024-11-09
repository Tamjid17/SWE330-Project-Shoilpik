import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"
import productsReducer from "./productSlice";
import productHistoryReducer from "./productHistorySlice";
import productHistorySellerReducer from "./productHistorySellerSlice";
import customerSlice from "./customerSlice";
import sellerSlice from "./sellerSlice";
import cartReducer from "./cartSlice";

const rootReducers = combineReducers({
  products: productsReducer,
  customer: customerSlice,
  seller: sellerSlice,
  cart: cartReducer,
  productHistory: productHistoryReducer,
  productHistorySeller: productHistorySellerReducer,
});
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;