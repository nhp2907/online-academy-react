import api, {searchByCriteria} from './api'
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
    const {data} = await api.get<Course[]>(`/api/course/search?kw=${kw}`)
    return data;
}

export const searchCourseByCriteria = async (dto: any): Promise<Course[]> => {
    const {data} = await searchByCriteria<Course[]>(`/api/course`, dto)
    return data;
}

export const coursesByCategoryName = async (cateName: string): Promise<Course[]> => {
    const {data} = await api.get(`/api/course?category=${cateName}`);
    return data;
}

