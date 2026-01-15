import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import productReducer from "../redux/features/productSlice"
import cartReducer from "../redux/features/cartSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
    },
});

