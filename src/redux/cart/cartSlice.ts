import CartState from "./CartState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Course from "../../model/Course";

const initialState: CartState = {
    courses: []
}

export const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addCourse: (state: CartState, action: PayloadAction<Course>) => {
            state.courses.push(action.payload);
        },
        removeCourse: (state: CartState, action: PayloadAction<Course>) => {
            state.courses.splice(state.courses.indexOf(action.payload), 1);
        },
        removeAll: (state: CartState, action: PayloadAction<any>) => {
            state.courses = [];
        }
    }
})

export const {addCourse, removeCourse, removeAll} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;