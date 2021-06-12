import api from './api'
import Course from "../model/Course";


export const getCourseList = async (tag: string) => {
    const {data} = await api.get<Course[]>(`/api/course?tag=${tag}`)
    return data;
}


export const getCourseById = async (id: string) => {
    const {data} = await api.get<Course>(`/api/course/${id}`)
    return data;
}

export const searchCourse = async (kw: string): Promise<Course[]> => {
    const {data} = await api.get<Course[]>(`/api/course/?kw=${kw}`)
    return data;
}