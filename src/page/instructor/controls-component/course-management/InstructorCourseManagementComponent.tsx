import React, {useEffect, useState} from 'react'
import ListCourseComponent from "../../../../component/common/list-course/ListCourseComponent";
import {User} from "../../../../model/User";
import Course from "../../../../model/Course";
import {searchCourseByCriteria} from "../../../../service/course.service";
import styles from './instructor-course.module.scss'
import {ProgressSpinner} from "primereact/progressspinner";
import {Button} from 'primereact/button';
import {Link, useHistory} from 'react-router-dom';

interface Props {
    user: User | null
}

const InstructorCourseManagementComponent: React.FC<Props> = ({user}) => {
    const history = useHistory();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            loadData().then(r => setIsLoading(false))
        }, 200);
    }, [])

    const loadData = async () => {
        const data = await searchCourseByCriteria({
            // instructorId: user?.id
        });
        setCourses(data)
    }

    if (isLoading) {
        return (<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
            <ProgressSpinner animationDuration=".6s"/>
        </div>)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>{`You have ${courses.length} course${courses.length > 0 ? 's' : ''}`}</h3>
                <Link to={'/instructor/course/new'}>
                    <Button label={'Add'} icon={'pi pi-plus'} iconPos={'right'} className={'p-button-success'}/>
                </Link>
            </div>
            <div className={styles.listCourseContainer}>
                <ListCourseComponent
                    itemOnClick={(course: Course) => {
                        history.push(`/instructor/course/${course.id}`)
                    }}
                    showIndex emptyMessage={`You don't have any course!`} courses={courses}/>
            </div>
        </div>
    );
}


export default InstructorCourseManagementComponent;