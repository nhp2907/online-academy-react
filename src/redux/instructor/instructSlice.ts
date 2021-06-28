import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import InstructorState from "./InstructorState";
import CourseChapter from "../../model/CourseChapter";
import CourseChapterComponent
    from "../../page/instructor/controls-component/course-detail/component/course-content/component/CourseChapterComponent";


const initialState: InstructorState = {
    editingCourse: {
        chapters: []
    },
    instructor: undefined
}

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        createChapter: (state: InstructorState, action: PayloadAction<CourseChapter>) => {
            state.editingCourse.chapters.push(action.payload);
        }
    }
})

export const {createChapter} = instructorSlice.actions
const instructorReducer = instructorSlice.reducer;
export default instructorReducer