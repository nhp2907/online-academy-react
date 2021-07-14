import React, {useEffect, useState} from 'react'
import CourseReview from "../../../../model/CourseReview";
import {Avatar} from "primereact/avatar";
import {Rating} from "primereact/rating";
import styles from './course-review-item.module.scss'
import './coruse-review-item.override.scss'
import moment from "moment";

interface Props {
    item: CourseReview
}

const CourseReviewItemComponent: React.FC<Props> = ({item}) => {
    useEffect(() => {
        // console.log('item.image', item.userImage);
    }, [])
    return (
        <div className={`styles.courseReviewItem course-review-item`} >
            {
                item.userImage ?
                    <Avatar style={{marginRight: 10}}
                            image={item.userImage}
                            className="p-mr-2" size="xlarge" shape="circle"/> :
                    <Avatar label={`${item.userFirstName.substring(0, 1)}${item.userLastName.substring(0, 1)}`.toUpperCase()}
                            style={{marginRight: 10}}
                            className="p-mr-2" size="xlarge" shape="circle"/>
            }
            <div className={styles.right}>
                <div style={{display: 'flex'}}>
                    <div className={styles.info} >
                        <h3>{item.userName}</h3>
                        <div style={{width: '100%', display: 'flex', alignItems: "center", justifyContent:"space-between"}}>
                            <Rating value={item.rating} cancel={false} readOnly={true} style={{fontSize: 13}}/>
                            <span><small>{
                                moment(item.createdAt).format('DD-MM-YYYY')}
                            </small></span>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <p>{item.content}</p>
                </div>
            </div>
        </div>
    );
}


export default CourseReviewItemComponent;