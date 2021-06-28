import {BaseModel} from "./BaseModel";

export default interface CourseVideoInfo extends BaseModel{
    id?: string;
    name: string;
    videoUrl: string
}