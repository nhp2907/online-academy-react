import {User} from "../model/User";
import api, {get, httpDelete, post, put} from './api'
import {getSearchQueryString} from "./search.utils";
import Course from "../model/Course";

export const getUserProfile = async (): Promise<User> => {
    const {data} = await api.get<User>('/api/user/me')
    return data;
}

export const findUserApi = async (): Promise<User []> => {
    const {data} = await api.get<User[]>('/api/admin/user');
    return data;
}

export const validateUser = async (body: any): Promise<any> => {
    const queryString = getSearchQueryString(body);
    const {data} = await api.get<any>(`/api/validate/user${queryString}`);
    return data;
}

export const updateUserApi = async (body: any): Promise<User> => {
    const {data} = await put<User>('/api/user', body);
    return data;
}

export const uploadUserImageApi = async (userId: any, dto: FormData): Promise<any> => {
    const {data} = await api.post<Course>(`/api/user/${userId}/image`, dto, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}

export const disableUserApi = async (id: any): Promise<any> => {
    return await httpDelete<any>(`/api/user/${id}`);
}

export const getWatchListApi = async (userId: any) : Promise<Course[]> => {
    const {data} = await get<Course[]>(`/api/user/${userId}/watch-list`);
    return data;
}

export const addCourseToWatchListApi = async (userId: any, courseId: any): Promise<any> => {
    const {data} = await post<any>(`/api/user/${userId}/watch-list`, {courseId});
    return data;
}

export const removeCourseFromWatchListApi = async (userId: any, courseId: any): Promise<any> => {
    const {data} = await httpDelete<any>(`/api/user/${userId}/watch-list/${courseId}`);
    return data;
}

