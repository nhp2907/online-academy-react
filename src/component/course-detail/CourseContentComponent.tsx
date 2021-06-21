import React from 'react'
import styles from './course-detail.module.scss'
import { Card } from 'primereact/card';
interface Props {

}

const CourseContentComponent : React.FC<Props> = ({}) => {
    return (
        <Card className={`p-shadow-5 ${styles.courseContent}`}>
            <h1>CourseContentComponent works</h1>
        </Card>
    );
}


export default CourseContentComponent;