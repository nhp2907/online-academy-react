import {BaseModel} from "./BaseModel";
import CourseVideoInfo from "./CourseVideoInfo";

export default interface CourseChapter extends BaseModel {
    id?: string;
    name: string;
    length?: number,
    videos?: CourseVideoInfo[]
}