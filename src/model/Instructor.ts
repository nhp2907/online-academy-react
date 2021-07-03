import {User} from "./User";

export default  interface Instructor extends  User {
    rating: number
    numReview: number
    numStudent: number,
    numCourse: number
}