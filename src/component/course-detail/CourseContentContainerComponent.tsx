import React from 'react'
import styles from './course-detail.module.scss'
import { Card } from 'primereact/card';
import CourseContentComponent from "../../page/instructor/controls-component/course-detail/component/course-content/CourseContentComponent";
import Course from "../../model/Course";
interface Props {
    course?: Course
}

const CourseContentContainerComponent : React.FC<Props> = ({course}) => {
    return (
        <Card className={`p-shadow-5 ${styles.courseContent}`}>
            <CourseContentComponent courseInfo={course} />
        </Card>
    );
}


export default CourseContentContainerComponent;