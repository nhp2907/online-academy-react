import React, {useEffect, useState} from 'react'
import FilterComponent from "./FilterComponent";
import ListCourseComponent from "./ListCourseComponent";
import '../../style.module.css'
import styles from '../search-result-page.module.scss'
import Course from "../../../model/Course";
import {searchCourse} from '../../../service/course.service'
import {Simulate} from "react-dom/test-utils";
import {getTopCourse} from "../../../service/home.service";

interface Props {

}

interface RouteParams {
    kw: string
}

const SearchResultMainComponent: React.FC<Props> = ({}) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [kw, setKw] = useState('');
    const [categoryName, setCategoryName] = useState('');
    useEffect(() => {
        if (typeof window != "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const kw: string = queryParams.get('kw') ?? '';
            const cateName: string = queryParams.get('category') ?? '';
            setKw(kw);
            setCategoryName(cateName)
            searchCourse_(kw).then(courses => setCourses(courses));
        }
    })

    useEffect(() => {

    })

    const searchCourse_: (kw: string) => Promise<Course[]> = async (kw: string): Promise<Course[]> => {
        return await searchCourse(kw)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {
                    kw?
                    `Result of "${kw}":` : `Course of "${categoryName}"`
                }
            </div>
            <div className={styles.content}>
                <FilterComponent input={courses} onChange={(filteredCourse) => {
                    console.log('filter courses', filteredCourse);
                    setCourses(filteredCourse)
                }}/>
                <ListCourseComponent courses={courses}/>
            </div>
        </div>
    );
}


export default SearchResultMainComponent;