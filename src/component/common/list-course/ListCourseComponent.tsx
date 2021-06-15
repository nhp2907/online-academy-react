import React from 'react'

import styles from './list-course.module.scss'
import Course from "../../../model/Course";
import RelatedCourseItem from "../../course-detail/molecule/RelatedCourseItem";
import EmptyListComponent from './EmptyListComponent';

interface Props {
    courses: Course[]
    emptyMessage?: string,
    showIndex?: boolean
    itemOnClick?: (course: Course) => void
}

const ListCourseComponent: React.FC<Props> = ({courses, itemOnClick, emptyMessage, showIndex}) => {
    return (
        <div className={styles.listCourse}>
            {
                courses.length == 0 ?
                    <EmptyListComponent message={emptyMessage}/> :
                    courses.map((c: Course) => (
                        <div className={styles.courseItem}>
                            {showIndex != false ? <span>{courses.indexOf(c) + 1}</span> : ''}
                            <div style={{flex: 1}} onClick={e => {
                                if (itemOnClick) {
                                    itemOnClick(c);
                                }
                            }}>
                                <RelatedCourseItem key={c.id} item={c}/>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}


export default ListCourseComponent;