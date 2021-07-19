import {BaseModel} from "./BaseModel";

export default interface CourseReview extends BaseModel{
    courseId: string
    rating: number
    userName: string;
    userFirstName: string;
    userLastName: string;
    userImage: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    content: string;
}