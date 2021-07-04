import api, {post, put} from './api'
import Category from "../model/Category";
import Course from "../model/Course";
import {getSearchQueryString} from "./search.utils";

//region Category
export const getCategories = async () => {
    console.log('get categories')
    const {data} = await api.get<Category[]>('/api/category');
    return data;
}

export const findCategoriesApi = async (query: any) => {
    const queryString = getSearchQueryString(query);
    const {data} = await api.get<Category[]>(`/api/category${queryString}`);
    return data;
}

//endregion

export const getCategoriesByLevel = async (level: 1 | 2 | 'all') => {
    const {data} = await api.get<Category[]>(`/api/category?level=${level}`);
    return data;
}

export const getTopCourseApi = async (): Promise<Course[]> => {
    const {data} = await api.get<Course[]>('/api/home/top-course');
    return data;
}

export const getMostViewCourseApi = async (): Promise<Course[]> => {
    const {data} = await api.get<Course[]>('/api/home/most-view-course');
    return data;
}

export const getLatestCourseApi = async (): Promise<Course[]> => {
    const {data} = await api.get<Course[]>('/api/home/latest-course');
    return data;
}