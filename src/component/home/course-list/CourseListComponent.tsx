import React from 'react'

import styles from './course-list.module.scss'
import Course from "../../../model/Course";
import CourseComponent from "../course/CourseComponent";
import {Carousel} from "primereact/carousel";


interface Props {
    title: string;
    courses: Course[]
}

const CourseListComponent: React.FC<Props> = ({courses, title}) => {

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const courseTemplate = (course: Course) => <CourseComponent item={course} />;
    return (
        <div className={`${styles.courseList}`}>
            <Carousel value={courses} numVisible={5} numScroll={5} responsiveOptions={responsiveOptions} className="custom-carousel"
                      itemTemplate={courseTemplate} header={<h3 className={styles.title}>{title}</h3>} />
        </div>
    );
}


export default CourseListComponent;