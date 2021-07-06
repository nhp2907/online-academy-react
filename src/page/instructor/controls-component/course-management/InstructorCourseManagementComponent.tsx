import React, {useEffect, useState} from 'react'
import ListCourseComponent from "../../../../component/common/list-course/ListCourseComponent";
import {User} from "../../../../model/User";
import Course from "../../../../model/Course";
import {searchCourseByCriteria} from "../../../../service/course.service";
import styles from './instructor-course.module.scss'
import {ProgressSpinner} from "primereact/progressspinner";
import {Button} from 'primereact/button';
import {Link, useHistory} from 'react-router-dom';
import Instructor from "../../../../model/Instructor";
import {getInstructorByUserId} from "../../../../service/instructor.service";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

interface Props {
}

const InstructorCourseManagementComponent: React.FC<Props> = ({}) => {
    const history = useHistory();
    const user = useSelector((state: RootState) => state.auth.user);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [instructor, setInstructor] = useState<Instructor>()
    useEffect(() => {
        console.log(user)
        if (user) {
            loadData().then(r => setIsLoading(false))
        }
    }, [user])

    const loadData = async () => {
        const instructor_ = await getInstructorByUserId(user?.id);
        setInstructor(instructor_)

        if (instructor_) {
            const data = await searchCourseByCriteria({
                instructorId: instructor_?.id
            });
            setCourses(data)
        }
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