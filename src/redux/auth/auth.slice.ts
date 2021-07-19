import AuthState from "./AuthState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";
import Axios from 'axios'

const initialState: AuthState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setToken: (state: AuthState, action: PayloadAction<string>) => {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            // @ts-ignore
            localStorage.setItem("token", action.payload.token);
            Axios.defaults.headers.authorization = 'Bearer ' + action.payload.token;
            state.user = action.payload.user;
        }
    }
})

export const {setToken, setUser, setAuth} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;