import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import categoriesReducer from "./categories/categorySlice";
import homeReducer from "./home/homeSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        home: homeReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>

export const authSelector = (state: RootState) => state.auth
export const categoriesSelector = (state: RootState) => state.categories
export const homeSelector = (state: RootState) => state.home

export type AppDispatch = typeof store.dispatch
export default store;

