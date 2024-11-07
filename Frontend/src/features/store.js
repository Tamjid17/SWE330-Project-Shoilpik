import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import productHistoryReducer from "./productHistorySlice";
import productHistorySellerReducer from "./productHistorySellerSlice";
import customerSlice from "./customerSlice";
import sellerSlice from "./sellerSlice";
const store = configureStore({
    reducer: {
        products: productsReducer,
        customer: customerSlice,
        seller: sellerSlice,
        productHistory: productHistoryReducer,
        productHistorySeller: productHistorySellerReducer,
    },
});

export default store;