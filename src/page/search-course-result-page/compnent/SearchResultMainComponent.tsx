import React, {useEffect, useState} from 'react'
import FilterComponent from "./FilterComponent";
import ListCourseComponent from "./ListCourseComponent";
import '../../style.module.css'
import styles from '../search-result-page.module.scss'
import {useHistory} from "react-router-dom";
import Course from "../../../model/Course";
import {searchCourse} from '../../../service/course.service'

interface Props {

}

interface RouteParams {
    kw: string
}

const SearchResultMainComponent: React.FC<Props> = ({}) => {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        if (typeof window != "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const kw: string = queryParams.get('kw') ?? '';
            searchCourse_(kw).then(courses => setCourses(courses));
        }
    })

    const searchCourse_: (_: string) => Promise<Course[]> = async (kw: string): Promise<Course[]> => {
        return await searchCourse(kw)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {`Result of "${'kw'}:"`}
            </div>
            <div className={styles.content}>
                <FilterComponent/>
                <ListCourseComponent />
            </div>
        </div>
    );
}


export default SearchResultMainComponent;