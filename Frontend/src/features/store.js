import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"
import productSlice from "./productSlice";
import oneProductSlice from "./oneProductSlice";
import productHistoryReducer from "./productHistorySlice";
import productHistorySellerReducer from "./productHistorySellerSlice";
import customerSlice from "./customerSlice";
import sellerSlice from "./sellerSlice";

const rootReducers = combineReducers({
  products: productSlice,
  oneProducts: oneProductSlice,
  customer: customerSlice,
  seller: sellerSlice,
  productHistory: productHistoryReducer,
  productHistorySeller: productHistorySellerReducer,
});
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;