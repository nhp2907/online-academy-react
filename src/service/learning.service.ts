import Course from "../model/Course";
import {get} from "./api";
import {getSearchQueryString} from "./search.utils";
import CourseVideoInfo from "../model/CourseVideoInfo";


export const getLastPlayCourseApi = async (userId: any, courseId: any): Promise<CourseVideoInfo> => {
    const queryString = getSearchQueryString({userId, courseId})
    const {data} = await get<CourseVideoInfo>(`/api/learning/last-play-video/${queryString}`);
    return data;
}