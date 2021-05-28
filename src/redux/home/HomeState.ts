import Course from "../../model/Course";
import CourseFeedBackInfo from "../../model/CourseFeedBackInfo";

export default interface HomeState {
    topCourses: Course[];
    latestCourses : Course[],
    mostEnrollCourses : Course[]
}