import {BaseModel} from "./BaseModel";

export default interface CourseReview extends BaseModel{
    creatorName: string;
    createImage: string;
    createId: string;
    createdAt: string;
    updatedAt: string;
    content: string;
}