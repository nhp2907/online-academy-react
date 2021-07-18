import React, {useEffect, useState} from 'react'

import styles from './list-course.module.scss'
import Course from "../../../model/Course";
import RelatedCourseItem from "../../course-detail/molecule/RelatedCourseItem";
import EmptyListComponent from './EmptyListComponent';
import {Paginator} from 'primereact/components/paginator/Paginator';

interface Props {
    courses: Course[]
    emptyMessage?: string,
    showIndex?: boolean
    itemOnClick?: (course: Course) => void
    isInstructor?: boolean
}

const ListCourseComponent: React.FC<Props> = ({courses, itemOnClick, emptyMessage, showIndex, isInstructor}) => {
    const [displayCourse, setDisplayCourse] = useState<Course[]>([])
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);
    useEffect(() => {
        setDisplayCourse(courses.slice(basicFirst, basicFirst + basicRows))
    }, [basicFirst, basicRows, courses])
    return (
        <div className={styles.listCourse}>
            {
                courses.length === 0 ?
                    <EmptyListComponent message={emptyMessage}/> :
                    displayCourse.map((c: Course) => (
                        <div className={styles.courseItem} key={c.id}>
                            {showIndex != false ? <span>{courses.indexOf(c) + 1}</span> : ''}
                            <div style={{flex: 1}} onClick={e => {
                                if (itemOnClick) {
                                    itemOnClick(c);
                                }
                            }}>
                                <RelatedCourseItem key={c.id} item={c} isInstructor={isInstructor}/>
                            </div>
                        </div>
                    ))
            }
            <Paginator first={basicFirst} rows={basicRows} totalRecords={courses.length}
                       rowsPerPageOptions={[5, 7, 10, 15, 20]}
                       onPageChange={(e) => {
                           console.log(e);
                           setBasicFirst(e.first)
                           setBasicRows(e.rows);
                       }}/>
        </div>
    );
}


export default ListCourseComponent;