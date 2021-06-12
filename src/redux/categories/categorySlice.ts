import CategoryState from "./CategoryState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Category from "../../model/Category";

const initialState: CategoryState = {
    list: [{
        id: 1,
        name: 'Web development',
        icon: 'book',
        subs: [
            {
                id: 1,
                name: "Python",
                icon: 'book',
                subs : []
            },
            {
                id: 2,
                name: "Java",
                icon: 'book',
                subs : []
            },
            {
                id: 3,
                name: "Javascript",
                icon: 'book',
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