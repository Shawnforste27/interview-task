import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const exstingItems = state.items.find((i) => state.items.find((i) => i.id === item.id));

            if (exstingItems) {
                exstingItems.quantity += 1
            } else {
                state.items.push({ ...item, quantity: 1 })
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;