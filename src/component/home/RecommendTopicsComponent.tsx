import React from 'react'
import styles from '../../page/home/home.module.scss'
import Course from "../../model/Course";

interface Props {
}

const RecommendTopicsComponent: React.FC<Props> = ({}) => {
    const topics: string[] = ['Python', 'Java', 'Html', 'Javascript', 'Ruby on rail'];
    return (
        <div className={styles.recommendTopic}>
            <h3 className={styles.title}>Topics recommend for you</h3>
            <div className={styles.content}>
            {
                topics.map((topic: string)  =>(
                    <div key={topic}><span key={topic}>{topic}</span></div>
                ))
            }
            </div>
        </div>
    );
}


export default RecommendTopicsComponent;