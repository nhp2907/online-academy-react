import React, {RefObject, useEffect, useState} from 'react'
import RecommendTopicsComponent from "./RecommendTopicsComponent";
import CoursesListComponent from "./course-list/CourseListComponent";
import NormalSectionComponent from "./NormalSectionComponent";

import styles from '../../page/home/home.module.scss'
import {Toast} from "primereact/toast";
import Course from "../../model/Course";
import {getLatestCourseApi, getMostViewCourseApi, getTopCourseApi} from "../../service/home.service";

interface Props {
    toastRef?: RefObject<Toast>
}

const HomeComponent: React.FC<Props> = ({toastRef}) => {
    const [topCourses, setTopCourse] = useState<Course[]>([])
    const [latestCourses, setLatestCourses] = useState<Course[]>([])
    const [mostViewCourse, setMostViewCourse] = useState<Course[]>([])
    useEffect(() => {
        getTopCourseApi().then(cs => setTopCourse(cs))
        getLatestCourseApi().then(cs => setLatestCourses(cs))
        getMostViewCourseApi().then(cs => setMostViewCourse(cs))
    }, [])

    return (
        <div className={styles.main}>
            <NormalSectionComponent/>
            <RecommendTopicsComponent/>
            <CoursesListComponent title={'Top courses of week'} courses={topCourses}/>
            <CoursesListComponent title={'Latest courses of week'} courses={latestCourses}/>
            <CoursesListComponent title={'Most view courses'} courses={mostViewCourse}/>
        </div>
    );
}


export default HomeComponent;