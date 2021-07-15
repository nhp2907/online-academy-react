import api from './api'
import Course from "../model/Course";
import Instructor from "../model/Instructor";
import {getSearchQueryString} from "./search.utils";

export const getAllCourse = async (instructorId: string): Promise<Course[]> => {
    const {data} = await api.get<Course[]>(`/api/course?instructorId=${instructorId}`);
    return data;
}

export const getInstructorByUserId = async (userId: any): Promise<Instructor> => {
    const {data} = await api.get<Instructor>(`/api/public/instructor/user/${userId}`);
    return data;
}

export const getInstructorById = async (instructorId: any): Promise<Instructor> => {
    const {data} = await api.get<Instructor>(`/api/public/instructor/${instructorId}`);
    return data;
}

export const getInstructorDetail = async (instructorId: any): Promise<Instructor> => {
    const {data} = await api.get<Instructor>(`/api/public/instructor/${instructorId}/detail`);
    return data;
}

export const updateInstructorInfoApi = async (body: any): Promise<any> => {
    const {data} = await api.put<any>(`/api/instructor`, body);
    return data;
}