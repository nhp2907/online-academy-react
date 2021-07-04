import React, {useEffect, useState} from 'react'
import FilterComponent from "./FilterComponent";
import ListCourseComponent from "../../../component/common/list-course/ListCourseComponent";
import '../../style.module.css'
import styles from '../search-result-page.module.scss'
import Course from "../../../model/Course";
import {getCourseApi, searchCourseApi} from '../../../service/course.service'
import usePrevious from "../../../hook/usePrevious";
import { useHistory } from 'react-router-dom';

interface Props {

}

interface RouteParams {
    kw: string
}

const SearchResultMainComponent: React.FC<Props> = ({}) => {
    const history = useHistory()
    const [courses, setCourses] = useState<Course[]>([]);
    const [kw, setKw] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const previous = usePrevious({kw, categoryName})

    useEffect(() => {
        if (typeof window != "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const kw: string = queryParams.get('kw') ?? '';
            const cateName: string = queryParams.get('category') ?? '';

            if (previous?.kw !== kw || previous.categoryName !== categoryName) {
                setKw(kw);
                setCategoryName(cateName)
                if (cateName) {
                    getCourseApi({categoryName: cateName}).then(c => setCourses(c))
                } else {
                    searchCourseApi({kw}).then(courses => setCourses(courses));
                }
            }
        }
    })


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {
                    kw ?
                        `Result of "${kw}":` : `Course of "${categoryName}"`
                }
            </div>
            <div className={styles.content}>
                <FilterComponent input={courses} onChange={(filteredCourse) => {
                    console.log('filter courses', filteredCourse);
                    setCourses(filteredCourse)
                }}/>
                <ListCourseComponent emptyMessage={"No course match your keyword!"} courses={courses}
                itemOnClick={(item) => history.push(`/course/${item.id}`)}/>
            </div>
        </div>
    );
}


export default SearchResultMainComponent;