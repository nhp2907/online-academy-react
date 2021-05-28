import AuthState from "./AuthState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";

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
            state.token = action.payload;
        },
        setAuth: (state :AuthState, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        }
    }
})

export const {setToken, setUser, setAuth} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;