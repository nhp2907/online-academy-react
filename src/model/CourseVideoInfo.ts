import {BaseModel} from "./BaseModel";

export default interface CourseVideoInfo extends BaseModel{
    id?: string;
    chapterId?:string
    name: string;
    videoUrl: string
}