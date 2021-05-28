import api from './api'



export const getCourList = async (tag: string) => {
    const {data} = await api.get(`/api/course?tag=${tag}`)
    return data;
}


export const getCourseById = async (id: string) => {
    const {data} = await api.get(`/api/course/${id}`)
    return data;
}