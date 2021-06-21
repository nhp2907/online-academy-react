import api, {searchByCriteria} from './api'
import Course from "../model/Course";
import Instructor from "../model/Instructor";

export const getAllCourse = async (instructorId: string): Promise<Course[]> => {
    const {data} = await api.get<Course[]>(`/api/course?instructorId=${instructorId}`);
    return data;
}

export const getInstructorById = async (instructorId: string): Promise<Instructor> => {
    const {data} = await api.get<Instructor>(`/api/user/${instructorId}`);
    return data;
}