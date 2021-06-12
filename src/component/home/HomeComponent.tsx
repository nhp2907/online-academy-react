import React, {RefObject} from 'react'
import RecommendTopicsComponent from "./RecommendTopicsComponent";
import CoursesListComponent from "./course-list/CourseListComponent";
import NormalSectionComponent from "./NormalSectionComponent";

import styles from '../../page/home/home.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Course from "../../model/Course";
import CourseComponent from "./course/CourseComponent";
import {Carousel} from "primereact/carousel";
import {Toast} from "primereact/toast";

interface Props {
    toastRef?: RefObject<Toast>
}

const HomeComponent : React.FC<Props> = ({toastRef}) => {
    const {topCourses, latestCourses, mostEnrollCourses} = useSelector((state: RootState) => state.home);
    return (
        <div className={styles.main}>
            <NormalSectionComponent />
            <RecommendTopicsComponent />
            <CoursesListComponent title={'Top courses of week'} courses={topCourses}/>
            <CoursesListComponent title={'Latest courses of week'} courses={latestCourses}/>
            <CoursesListComponent title={'Most enroll courses'} courses={mostEnrollCourses}/>
        </div>
    );
}


export default HomeComponent;