import Course from "../../model/Course";
import {ToastMessageType} from "primereact/components/toast/Toast";

export default interface HomeState {
    topCourses: Course[];
    latestCourses: Course[];
    mostEnrollCourses: Course[];
    message?: ToastMessageType;
    showToastMessage?: (message: ToastMessageType) => void
}