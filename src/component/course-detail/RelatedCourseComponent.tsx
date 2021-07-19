import React from 'react'

import styles from './course-detail.module.scss'
import Course from "../../model/Course";
import RelatedCourseItem from "./molecule/RelatedCourseItem";
import {Card} from 'primereact/card';
import {useHistory} from 'react-router-dom';

interface Props {
    courses: Course[]
}

const RelatedCourseComponent: React.FC<Props> = ({courses}) => {
    const history = useHistory();
    return (
        <Card className={styles.relatedCourse} title={'Related courses'}>
            <div className={styles.content}>
                {
                    courses.map((c: Course) =>
                        <div key={c.id} className={styles.courseContainer}
                            // onClick={(e: any) => window.location.href = `/course/${c.id}`}
                             onClick={(e: any) => history.push(`/course/${c.id}`)}
                        >
                            <RelatedCourseItem item={c}/>
                        </div>
                    )
                }
            </div>
        </Card>
    );
}


export default RelatedCourseComponent;