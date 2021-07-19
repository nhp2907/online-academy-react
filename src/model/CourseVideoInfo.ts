import {BaseModel} from "./BaseModel";

export default interface CourseVideoInfo extends BaseModel{
    id?: string;
    chapterId?:string
    course?:string
    name: string;
    videoUrl: string
}
