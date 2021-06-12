import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import {PersistConfig} from "redux-persist/es/types";
import reducers, {RootReducer} from "./reducer";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {Reducer} from 'redux'

const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer: Reducer<RootReducer, any> = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'home/setShowMessage'],
            ignoredActionPaths: ['home.showToastMessage'],
            ignoredPaths: ['home.showToastMessage']
        },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export const authSelector = (state: RootState) => state.auth
export const categoriesSelector = (state: RootState) => state.categories
export const homeSelector = (state: RootState) => state.home

export type AppDispatch = typeof store.dispatch
export default store;


