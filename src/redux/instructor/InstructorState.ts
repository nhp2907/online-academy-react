import Course from "../../model/Course";
import Instructor from "../../model/Instructor";

export default interface InstructorState {
    editingCourse: any,
    instructor?: Instructor
}