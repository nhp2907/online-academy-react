import React from 'react'
import CourseReview from "../../model/CourseReview";

import styles from './course-detail.module.scss'
import CourseReviewItemComponent from "./molecule/CourseReviewItemComponent";
import { Card } from 'primereact/card';

interface Props {
    items: CourseReview[]
}

const ReviewsComponent : React.FC<Props> = ({items}) => {
    return (
        <Card className={styles.review}>
            <h3 className={styles.title}></h3>
            <div className={styles.content}>
                {
                    items.map((cr:CourseReview) => <CourseReviewItemComponent item={cr} />)
                }
            </div>
        </Card>
    );
}


export default ReviewsComponent;