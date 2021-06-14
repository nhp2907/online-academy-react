import api, {searchByCriteria} from './api'
import Course from "../model/Course";

export const getAllCourse = async (instructorId: string): Promise<Course[]> => {
    const {data} = await api.get<Course[]>(`/api/course/instructorId=${instructorId}`);
    return data;
}