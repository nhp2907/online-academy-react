import React from 'react'

import styles from './course-list.module.scss'
import Course from "../../../model/Course";
import CourseComponent from "../course/CourseComponent";


interface Props {
    title: string;
    courses: Course[]
}

const CourseListComponent: React.FC<Props> = ({courses, title}) => {

    return (
        <div className={styles.courseList}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>
                {
                    courses.map((c: Course) => <CourseComponent item={c}/>)
                }
            </div>
        </div>
    );
}


export default CourseListComponent;