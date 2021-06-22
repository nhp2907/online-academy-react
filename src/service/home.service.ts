import api from './api'
import Category from "../model/Category";

export const getCategories = async () => {
    const {data} = await api.get<Category[]>('/api/category');
    return data;
}

export const getCategoriesByLevel = async (level: 1 | 2 | 'all') => {
    const {data} = await api.get<Category[]>(`/api/category?level=${level}`);
    return data;
}

export const getTopCourse = async () => {
    const {data} = await api.get<Category[]>('/api/category');
    return data;
}