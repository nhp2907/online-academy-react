import api from './api'
import Category from "../model/Category";

export const getCategories = async () => {
    const {data} = await api.get<Category[]>('/api/category');
    return data;
}

export const getTopCourse = async () => {
    const {data} = await api.get<Category[]>('/api/category');
    return data;
}