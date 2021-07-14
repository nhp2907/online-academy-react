import {User} from "./User";

export default  interface Instructor extends  User {
    id: string;
    userId: string;
    rating: number
    numReview: number
    numStudent: number,
    numCourse: number
    brief?: string
}