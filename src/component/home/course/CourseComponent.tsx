import React from 'react'
import {useHistory} from 'react-router-dom'
import Course from "../../../model/Course";

import styles from './course.module.scss'

interface Props {
    item: Course
}

const CourseComponent: React.FC<Props> = ({item}) => {
    const history = useHistory();

    return (
        <div className={styles.course} onClick={() => history.push(`/course/${item.id}`)}>
            <div className={styles.image}>
                <img style={{backgroundColor: "gray"}} src={item.image} alt=""/>
            </div>
            <div className={styles.info}>
                <h3>{item.name}</h3>
                <span className={styles.author}>{item.author}</span>
                <div className={styles.rating}>
                    <span className={styles.number}>{item.rating}</span>
                    <div className={styles.startRating}>{"abc"}</div>
                    <span className={styles.numberOfRate}>{item.numReview}</span>
                </div>
            </div>
        </div>
    );
}


export default CourseComponent;