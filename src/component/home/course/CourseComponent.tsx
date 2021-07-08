import React from 'react'
import {useHistory} from 'react-router-dom'
import Course from "../../../model/Course";

import styles from './course.module.scss'
import {Rating} from "primereact/rating";

interface Props {
    item: Course
}

const CourseComponent: React.FC<Props> = ({item}) => {
    const history = useHistory();
    return (
        <div className={styles.course} onClick={(event) => {
            history.push(`/course/${item.id}`)
        }}>
            <div className={styles.image}>
                <img style={{backgroundColor: "gray"}} src={item.image} alt=""/>
            </div>
            <div className={styles.info}>
                <h3>{item.name}</h3>
                {item.author ? <p className={styles.author}><small>Author </small><strong>{item.author}</strong></p> : ''}
                {item.categoryName ? <p className={styles.author}><small>Category </small><strong>{item.categoryName}</strong></p> : ''}
                <div className={styles.rating}>
                    <span className={styles.number}>{Math.round((item.rating + Number.EPSILON) * 10) / 10}</span>
                    <div className={styles.startRating}><Rating value={item.rating} cancel={false}/></div>
                    <span className={styles.numberOfRate}>{`(${item.numReview} reviews)`}</span>
                </div>
            </div>
            <div className={styles.priceAndBuy}>
                <div className={styles.prices}>
                    <span>{item.price + ' USD'}</span>
                    {item.prePrice ? <span>{item.prePrice}</span> : ''}
                </div>
                <span className={styles.badge}>Best Seller</span>
            </div>
        </div>
    );
}


export default CourseComponent;