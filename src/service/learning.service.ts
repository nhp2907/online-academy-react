import Course from "../model/Course";
import {get, post} from "./api";
import {getSearchQueryString} from "./search.utils";
import CourseVideoInfo from "../model/CourseVideoInfo";


export const getLastPlayCourseApi = async (userId: any, courseId: any): Promise<any> => {
    const queryString = getSearchQueryString({userId, courseId})
    const {data} = await get<any>(`/api/learning/last-play-video/${queryString}`);
    return data;
}

export const saveLearningStatus = async (body: any): Promise<CourseVideoInfo> => {
    console.log('save learning status', body)
    const {data} = await post<CourseVideoInfo>(`/api/learning/save-status/`, body);
    return data;
}