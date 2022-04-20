import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice, { ProductsStateType } from "./reducers/productsSlice";

export const rootReducer = combineReducers({
    products: productsSlice,
});

export const setupStore = (initialState = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];