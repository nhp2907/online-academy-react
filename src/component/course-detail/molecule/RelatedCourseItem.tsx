import React from 'react'

import styles from './related-course-item.module.scss'
import Course from "../../../model/Course";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faUsers} from "@fortawesome/free-solid-svg-icons";

interface Props {
    item: Course
}

const RelatedCourseItem: React.FC<Props> = ({item}) => {

    return (
        <div className={styles.relatedCourseItem}>
            <div className={styles.image}>
                <img src={item.image} alt=""/>
            </div>
            <div className={styles.info}>
                <div className={styles.basicInfo}>
                    <h4 className={styles.name}>{item.name}</h4>
                    {item.author ? <p className={styles.author}><small>Author </small><strong>{item.author}</strong></p> : ''}
                    {item.categoryName ? <p className={styles.author}><small>Category </small><strong>{item.categoryName}</strong></p> : ''}
                    <div className={styles.statusAndTime}>
                        <span className={styles.status}> {item.status}</span>
                        <span className={styles.time}>{item.updatedAt}</span>
                    </div>
                </div>
                <div className={styles.ratingContainer}>
                    <div className={styles.rating}>
                        <span>{Math.round((item.rating + Number.EPSILON) * 10) / 10}</span>
                        <FontAwesomeIcon icon={faStar} color={'#FFA500'} style={{textAlign: "center"}}/>
                    </div>
                    <div className={styles.numOfMember}>
                        <span>{item.numStudentEnroll}</span>
                        <FontAwesomeIcon icon={faUsers} color={'#FFA500'} style={{textAlign: "center"}}/>
                    </div>
                    <div className={styles.cost}>
                        <h4>{item.price} {item.concurrency || 'USD'}</h4>
                        {
                            item.prePrice ? <span>{item.prePrice} {item.concurrency}</span> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RelatedCourseItem;