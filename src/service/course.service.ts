import api, {get, httpDelete, post, postWithHeader, put, searchByCriteria} from './api'
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

export const uploadCourseImageApi = async (courseId: string, dto: FormData): Promise<any> => {
    console.log('formdata', dto)
    console.log(courseId)
    const {data} = await api.post<Course>(`/api/course/${courseId}/image`, dto, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}

export const getCourseImageApi = async (courseId: string): Promise<any> => {
    const {data} = await get<Course>(`/api/course/${courseId}/image`);
    return data;
}

//region Course Chapter
export const createCourseChapter = async (courseId: string, chapter: CourseChapter): Promise<CourseChapter> => {
    const {data} = await post<CourseChapter>(`/api/course/${courseId}/chapter`, chapter);
    return data;
}

export const updateCourseChapterApi = async (courseId: string, chapter: CourseChapter): Promise<CourseChapter> => {
    const {data} = await put<CourseChapter>(`/api/course/${courseId}/chapter`, chapter);
    return data;
}

export const getCourseChaptersApi = async (courseId: string): Promise<CourseChapter[]> => {
    const {data} = await get<CourseChapter[]>(`/api/course/${courseId}/chapter`);
    return data;
}

export const deleteCourseChapterApi = async (courseId: any, chapterId: any): Promise<any> => {
    const {data} = await httpDelete<any>(`/api/course/${courseId}/chapter/${chapterId}`);
    return data;
}
//endregion

//region Course Video
export const createCourseVideoApi = async (courseId: any, video: FormData): Promise<CourseVideoInfo> => {
    const path = `/api/course/${courseId}/chapter/${video.get('chapterId')}/video`;
    const data = await postWithHeader<CourseVideoInfo>(path, video, {
        'Content-Type': 'multipart/form-data'
    });
    return data;
}

export const getCourseVideoApi = async (courseId: any, chapterId: any): Promise<CourseVideoInfo[]> => {
    const path = `/api/course/${courseId}/chapter/${chapterId}/video`;
    const {data} = await get<CourseVideoInfo[]>(path);
    return data;
}

//endregion