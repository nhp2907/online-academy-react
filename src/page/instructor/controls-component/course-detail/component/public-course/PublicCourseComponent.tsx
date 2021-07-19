import {Button} from 'primereact/button';
import React, {useEffect, useState} from 'react'

import styles from './public-course.module.scss'
import Course from "../../../../../../model/Course";
import Instructor from "../../../../../../model/Instructor";
import {checkCourseCanPublishApi, publishCourseApi} from "../../../../../../service/course.service";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

interface Props {
    course: Course
    instructor: Instructor
}

const PublicCourseComponent: React.FC<Props> = ({course, instructor}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const [canPublish, setCanPublish] = useState(false)

    useEffect(() => {
        checkCourseCanPublishApi(course.id).then(r => setCanPublish(r.canPublish))
    }, [])

    if (course.published) {
        return <div className={styles.publicCourse}>
            <span>Your course is published</span>
        </div>
    }
    const publishCourse = async () => {
        try {
            await publishCourseApi(course.id)
            showToastMessage({severity: 'success', summary: "Successfully", detail: 'Course is published successfully!'})
        } catch (err) {
            showToastMessage({severity: 'error', summary: "Failed", detail: err.response.message})
        }
    }

    return (
        canPublish ?
            <div className={styles.publicCourse}>
                <span>Successfully! Your course is ready to publish</span>
                <Button label={'Publish now'} className={'p-button-danger'}
                        onClick={publishCourse}/>
            </div> :
            <div className={styles.publicCourse}>
                <span>Your course is not ready to publish</span>
            </div>
    );
}


export default PublicCourseComponent;
