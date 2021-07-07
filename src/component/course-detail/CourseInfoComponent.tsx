import React from 'react'

import styles from './course-detail.module.scss'
import Course from "../../model/Course";
import Instructor from "../../model/Instructor";
import {Rating} from 'primereact/rating'

interface Props {
    course: Course
    instructor: Instructor
}

const CourseInfoComponent: React.FC<Props> = ({course, instructor}) => {
    return (
        <div className={styles.courseInfo}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={course.image} alt=""/>
                </div>
                <h2 className={styles.name}>{course.name}</h2>
                <span className={styles.headline}>{course.headline}</span>
                <div className={styles.ratingContainer}>
                    {/*<span className={styles.status}>{course.status}</span>*/}
                    <span className={styles.ratingNumber}>{Math.round((course.rating + Number.EPSILON) * 10) / 10}</span>
                    <Rating value={Math.round((course.rating + Number.EPSILON) * 10) / 10} cancel={false} style={{color: 'orange'}}/>
                    <span className={styles.numOfRating}>{course.numReview}</span>
                    <span className={styles.numOfStudent}>{course.numStudentEnroll}</span>
                </div>
                <p className={styles.author}>{`Created by `}<strong>{`${instructor.firstName} ${instructor.lastName}`}</strong></p>
                <p className={styles.time}>{'Last updated ' + course.updatedAt}</p>
            </div>
        </div>
    );
}


export default CourseInfoComponent;