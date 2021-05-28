import React from 'react'

import styles from '../../page/home/home.module.scss'
import Course from "../../model/Course";

interface Props {
    courses: Course[]
}

const LatestCourseComponent : React.FC<Props> = ({courses}) => {
    return (
        <div className={styles.latestCourses}>
            <h1>LatestCourseComponent works</h1>
        </div>
    );
}


export default LatestCourseComponent;