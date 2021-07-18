import React from 'react'

import styles from './course-list.module.scss'
import Course from "../../../model/Course";
import CourseComponent from "../course/CourseComponent";
import {Carousel} from "primereact/carousel";
import useWindowDimensions from "../../../hook/userWindowDimensions";


interface Props {
    title: string;
    courses: Course[]
    numVisible?: number
}

const CourseListComponent: React.FC<Props> = ({courses, title, numVisible}) => {

    const {width} = useWindowDimensions();

    const responsiveOptions = [
        {
            breakpoint: '1500x',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1289px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1000px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '650px',
            numVisible: 1,
            numScroll: 1
        },
    ];
    const courseTemplate = (course: Course) => <CourseComponent item={course}/>;
    return (
        <div className={`${styles.courseList}`}>
            <Carousel value={courses} numVisible={numVisible || 5} numScroll={numVisible || 5} responsiveOptions={responsiveOptions}
                      itemTemplate={courseTemplate} header={<h3 className={styles.title}>{title}</h3>}/>
        </div>
    );
}


export default CourseListComponent;