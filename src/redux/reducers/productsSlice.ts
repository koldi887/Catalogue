import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { ProductType } from "../../types/ProductType";
import { productsApi } from "../../api/products-api";

export const getProducts = createAsyncThunk<void, void>
("products/getProducts",
    async function (_, { dispatch }) {
        dispatch(setFetching())
        try {
            const response = await productsApi.requestProducts()
            dispatch(setProducts(response))
        } catch {
            dispatch(setError('Some error has been occurred'))
        } finally {
            dispatch(setFetching())
        }
    });

let initialState = {
    products: [] as ProductType[],
    isFetching: false,
    error: '',
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload
            if (state.error) state.error = ''
        },
        setFetching: (state) => {
            state.isFetching = !state.isFetching
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    },
});

export const { setProducts, setFetching, setError } = productsSlice.actions;
export const productsSelector = (state: RootState) => state.products;
export default productsSlice.reducer;