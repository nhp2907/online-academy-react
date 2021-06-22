import {BaseModel} from "./BaseModel";

export default interface CourseFeedBackInfo extends BaseModel{
    rating: number;
    numReview: number;
    percents: number[]
}