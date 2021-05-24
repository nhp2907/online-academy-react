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
        }
    }
})
export const {setUser} = authSlice.actions;
let authReducer = authSlice.reducer;
export default authReducer;