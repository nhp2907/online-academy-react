import React from 'react'

import styles from './course-detail.module.scss'
import Course from "../../model/Course";
import Instructor from "../../model/Instructor";
import {Rating} from 'primereact/rating'
import moment from "moment";

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
                <p className={styles.author}><small>{`Created by `}</small><strong>{`${instructor.firstName} ${instructor.lastName}`}</strong></p>
                <p className={styles.numOfStudent}>{`${course.numStudentEnroll} students`}</p>
                <div className={styles.ratingContainer}>
                    {/*<span className={styles.status}>{course.status}</span>*/}
                    <span className={styles.ratingNumber}>{Math.round((course.rating + Number.EPSILON) * 10) / 10}</span>
                    <Rating value={Math.round((course.rating + Number.EPSILON) * 10) / 10} cancel={false} style={{color: 'orange'}}/>
                    <span className={styles.numOfRating}>{`(${course.numReview})`}</span>
                </div>
                <p className={styles.time}><small>Last updated at </small>
                    {moment(course.updatedAt).format('DD-MM-YYYY')}
                </p>
            </div>
        </div>
    );
}


export default CourseInfoComponent;