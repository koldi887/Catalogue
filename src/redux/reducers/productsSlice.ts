import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { ProductType } from "../../types/ProductType";

export const getProducts = createAsyncThunk<void, void>
("products/getProducts",
    async function (_, { dispatch }) {
    });

let initialState = {
    products: [] as ProductType[],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setUsers: (state, action) => {
        },
    },
});

export const { setUsers } = productsSlice.actions;
export const productsSelector = (state: RootState) => state.products;
export default productsSlice.reducer;