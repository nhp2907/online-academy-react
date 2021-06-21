import React from 'react'

import styles from './course-detail.module.scss'
import Course from "../../model/Course";
import RelatedCourseItem from "./molecule/RelatedCourseItem";
import { Card } from 'primereact/card';

interface Props {
    courses: Course[]
}

const RelatedCourseComponent: React.FC<Props> = ({courses}) => {
    return (
        <Card className={styles.relatedCourse} title={'Related courses'}>
            <div className={styles.content}>
                {
                    courses.map((c: Course) => <>
                        <RelatedCourseItem item={c}/>
                    </>)
                }
            </div>
        </Card>
    );
}


export default RelatedCourseComponent;