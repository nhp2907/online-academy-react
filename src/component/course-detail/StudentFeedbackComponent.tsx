import React from 'react'

import styles from './course-detail.module.scss'
import CourseFeedBackInfo from "../../model/CourseFeedBackInfo";
import { Card } from 'primereact/card';

interface Props {
    item: CourseFeedBackInfo
}

const StudentFeedbackComponent: React.FC<Props> = ({item: {percents, rating, numReview}}) => {
    return (
        <Card className={styles.studentFeedBack}>
            <h3 className={styles.title}>Student feedback</h3>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h2>{rating}</h2>
                    <div>start rating</div>
                    <span>{`Total ${numReview} reviews`}</span>
                </div>
                <div className={styles.right}>
                    {
                        percents.map((p, i) => <StarBar percent={p} level={(5 - i) + ''}/>)
                    }
                </div>
            </div>
        </Card>
    );
}

interface StarBarProps {
    level: string;
    percent: number;
}

const StarBar: React.FC<StarBarProps> = ({percent, level}) => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: 10}}>{level}</span>
            <div style={{height: 10, width: `${percent}%`,backgroundColor: '#FF8C00'}}>

            </div>
        </div>
    )
}

export default StudentFeedbackComponent;