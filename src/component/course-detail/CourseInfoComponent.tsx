import React from 'react'

import styles from './course-detail.module.scss'
import Course from "../../model/Course";

interface Props {

}

const CourseInfoComponent: React.FC<Props> = ({}) => {
    const course: Course = {
        id: 'abcdyx',
        rating: 4.5,
        numReview: 1000,
        concurrency: '$',
        name: 'The Complete JavaScript Course 2020: From Zero to Expert!',
        author: 'NHP Phuc',
        status: '1',
        discount: 30,
        price: 100,
        prePrice: 10,
        description: 'Mô tả',
        headline: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one',
        language: 'EN',
        image: 'https://i.morioh.com/2020/03/04/eb705fc35a89.jpg',
        numLecture: 10,
        numStudentEnroll: 100,
        estimateContentLength: 10,
        updatedAt: '20/01/2021'
    }

    return (
        <div className={styles.courseInfo}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={course.image} alt=""/>
                </div>
                <div className={styles.breadcrumb}></div>
                <h2 className={styles.name}>{course.name}</h2>
                <span className={styles.headline}>{course.headline}</span>
                <div className={styles.ratingContainer}>
                    <span className={styles.status}>{course.status}</span>
                    <span className={styles.ratingNumber}>4.5</span>
                    <span className={styles.numOfRating}>{course.numReview}</span>
                    <span className={styles.numOfStudent}>{course.numStudentEnroll}</span>
                </div>
                <p className={styles.author}>{'Created by ' + course.author}</p>
                <p className={styles.time}>{'Last updated ' + course.updatedAt}</p>
            </div>
        </div>
    );
}


export default CourseInfoComponent;