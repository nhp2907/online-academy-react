import api, {post, put} from './api'
import Category from "../model/Category";
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

export const getTopCourse = async () => {
    const {data} = await api.get<Category[]>('/api/course?tag=top');
    return data;
}