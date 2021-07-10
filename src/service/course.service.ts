import api, {get, httpDelete, post, postWithHeader, put, searchByCriteria} from './api'
import Course from "../model/Course";
import CourseChapter from "../model/CourseChapter";
import CourseVideoInfo from "../model/CourseVideoInfo";
import {getSearchQueryString} from "./search.utils";
import CourseReview from "../model/CourseReview";
import CourseFeedBackInfo from "../model/CourseFeedBackInfo";


export const getCourseApi = async (query: any) => {
    const queryString = getSearchQueryString(query);
    const {data} = await api.get<Course[]>(`/api/course${queryString}`)
    return data;
}


export const getCourseById = async (id: string) => {
    const {data} = await api.get<Course>(`/api/course/${id}`)
    return data;
}

export const plusCourseViewsApi = async (id: any) => {
    const {data} = await api.put<Course>(`/api/course/${id}/plusView`)
    return data;
}

export const searchCourseApi = async (query: any): Promise<Course[]> => {
    const queryString = getSearchQueryString(query);
    const {data} = await api.get<Course[]>(`/api/course/search${queryString}`)
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

export const deleteVideoApi = async (item: any): Promise<CourseVideoInfo[]> => {
    const path = `/api/course/${item.courseId}/chapter/${item.chapterId}/video/${item.id}`;
    const {data} = await httpDelete<CourseVideoInfo[]>(path);
    return data;
}

//endregion

//region Course Review
export const createCourseReviewApi = async (courseId: any, review: any): Promise<CourseReview> => {
    const path = `/api/course/${courseId}/review`;
    const {data} = await post<CourseReview>(path, review);
    return data;
}

export const getCourseReviewApi = async (courseId: any): Promise<CourseReview[]> => {
    const path = `/api/course/${courseId}/review`;
    const {data} = await get<CourseReview[]>(path);
    return data;
}

export const deleteReviewApi = async (item: any): Promise<CourseReview> => {
    const path = `/api/course/${item.courseId}/review/${item.id}`;
    const {data} = await httpDelete<CourseReview>(path);
    return data;
}

//endregion


//region Course Feedback
export const getCourseFeedBackApi = async (courseId: any): Promise<CourseFeedBackInfo> => {
    const path = `/api/course/${courseId}/feedback`;
    const {data} = await get<CourseFeedBackInfo>(path);
    return data;
}
//endregion

export const getRelatedCourseApi = async (courseId: any): Promise<Course[]> => {
    const path = `/api/course/${courseId}/related`;
    const {data} = await get<Course[]>(path);
    return data;
}

