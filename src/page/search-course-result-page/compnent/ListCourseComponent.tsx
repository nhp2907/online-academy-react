import React from 'react'

import styles from '../search-result-page.module.scss'
import Course from "../../../model/Course";
import RelatedCourseItem from "../../../component/course-detail/molecule/RelatedCourseItem";
import EmptyListComponent from "./EmptyListComponent";

interface Props {
    courses: Course[]
}

const ListCourseComponent: React.FC<Props> = ({courses}) => {
    return (
        <div className={styles.listCourse}>
            {
                courses.length == 0 ?
                    <EmptyListComponent message={"No course match your key word!"}/> :
                    courses.map((c: Course) => <RelatedCourseItem item={c}/>)
            }
        </div>
    );
}


export default ListCourseComponent;