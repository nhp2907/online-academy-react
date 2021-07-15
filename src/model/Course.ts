import {BaseModel} from "./BaseModel";

export default interface Course extends BaseModel {
    id: string | null;
    instructorId?: string,
    categoryId?: string;
    subCategoryId?: string;
    name: string;
    author: string;
    price: number;
    prePrice: number;
    rating: number;
    description: string;
    headline: string;
    image: string;
    concurrency: string;
    discount: number;
    language: string;
    numReview: number;
    numLecture: number;
    estimateContentLength: number;
    numStudentEnroll: number;
    createdAt?: string;
    updatedAt?: string;
    status: string;
    disabled?: boolean;
    published?: boolean
    deleted?: boolean
}
