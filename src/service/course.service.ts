import api, {get, post, searchByCriteria} from './api'
import Course from "../model/Course";
import CourseChapter from "../model/CourseChapter";
import CourseVideoInfo from "../model/CourseVideoInfo";


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

export const createCourse = async (dto: any): Promise<Course> => {
    console.log(dto);
    const {data} = await api.post<Course>('/api/course', dto);
    return data;
}

export const updateCourse = async (dto: any): Promise<Course> => {
    const {data} = await api.put<Course>('/api/course', dto);
    return data;
}
export const uploadCourseImage = async (courseId: string, dto: FormData): Promise<any> => {
    console.log('formdata', dto)
    const {data} = await api.post<Course>(`/api/course/${courseId}/image`, dto, {
        headers: {}
    });
    return data;
}

export const createCourseChapter = async (courseId: string, chapter: CourseChapter): Promise<CourseChapter> => {
    const {data} = await post<CourseChapter>(`/api/course/${courseId}/chapter`, chapter);
    return data;
}

export const createCourseVideo = async (courseId: string, video: CourseVideoInfo): Promise<CourseChapter> => {
    const {data} = await post<CourseChapter>(`/api/course/${courseId}/video`, video);
    return data;
}

export const getCourseChaptersApi = async (courseId: string): Promise<CourseChapter[]> => {
    const {data} = await get<CourseChapter[]>(`/api/course/${courseId}/chapter`);
    return data;
}

