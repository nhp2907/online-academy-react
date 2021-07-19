import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import InstructorState from "./InstructorState";
import CourseChapter from "../../model/CourseChapter";

const initialState: InstructorState = {
    editingCourse: {
        chapters: []
    },
}

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        createChapter: (state: InstructorState, action: PayloadAction<CourseChapter>) => {
            state.editingCourse.chapters.push(action.payload);
        },
    }
})

export const {createChapter} = instructorSlice.actions
const instructorReducer = instructorSlice.reducer;
export default instructorReducer