import CategoryState from "./CategoryState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Category from "../../model/Category";

const initialState: CategoryState = {
    list: [{
        id: 1,
        name: 'Web development',
        subs: [
            {
                id: 1,
                name: "Python",
                subs : []
            },
            {
                id: 2,
                name: "Java",
                subs : []
            },
            {
                id: 3,
                name: "Javascript",
                subs : []
            }
        ]
    }]
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state: CategoryState, action: PayloadAction<Category[]>) => {
            state.list = action.payload;
        }
    }
})

export const {setCategories} = categorySlice.actions;

const categoriesReducer = categorySlice.reducer;
export default categoriesReducer;