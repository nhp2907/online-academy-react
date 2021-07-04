import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import HomeState from "./HomeState";
import Course from "../../model/Course";
import {ToastMessageType} from "primereact/toast";

const sampleCourse = {
    id: 'abcdyx',
    rating: 4.5,
    numReview: 1000,
    concurrency: '$',
    name: 'React',
    author: 'NHP Phuc',
    status: '1',
    discount: 30,
    price: 100,
    prePrice: 10,
    description: 'Mô tả',
    headline: 'head line',
    language: 'EN',
    image: 'https://i.morioh.com/2020/03/04/eb705fc35a89.jpg',
    numLecture: 10,
    numStudentEnroll: 100,
    estimateContentLength: 10

}
const initialState: HomeState = {
    topCourses: [sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse],
    latestCourses: [sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse],
    mostEnrollCourses: [sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse, sampleCourse],
    showToastMessage: message => {
    }
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setTopCourses: (state: HomeState, action: PayloadAction<Course []>) => {
            state.topCourses = action.payload
        },
        setLatestCourses: (state: HomeState, action: PayloadAction<Course []>) => {
            state.latestCourses = action.payload
        },
        setMostEnrollCourses: (state: HomeState, action: PayloadAction<Course []>) => {
            state.mostEnrollCourses = action.payload
        },
        setToastMessage: (state: HomeState, action: PayloadAction<ToastMessageType>) => {
            state.message = action.payload
        },
        setShowMessage: (state: HomeState, action: PayloadAction<(m: ToastMessageType) => void>) => {
            state.showToastMessage = action.payload
        }
    }
})

export const {setTopCourses, setLatestCourses, setMostEnrollCourses, setToastMessage, setShowMessage} = homeSlice.actions
const homeReducer = homeSlice.reducer;
export default homeReducer;