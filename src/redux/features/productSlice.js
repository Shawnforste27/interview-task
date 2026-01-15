import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ limit, skip, category }) => {
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        if (category !== "all") {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        const res = await fetch(url);
        return await res.json();
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const res = await fetch("https://dummyjson.com/products/categories");
        return await res.json();
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        categories: [],
        total: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export default productSlice.reducer;
