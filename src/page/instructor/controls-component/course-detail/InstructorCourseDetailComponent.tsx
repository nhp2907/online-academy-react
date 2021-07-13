import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ControlComponentProps from "../../../management-page/model/ControlComponentProps";
import styles from './course-detail.module.scss';
import {TabPanel, TabView} from 'primereact/tabview';
import CourseContentComponent from "./component/course-content/CourseContentComponent";
import PublicCourseComponent from "./component/public-course/PublicCourseComponent";
import BasicCourseInfoComponent from "./component/basic-course-info/BasicCourseInfoComponent";
import {RootState} from "../../../../redux/store";
import {useSelector} from 'react-redux';
import Instructor from '../../../../model/Instructor';
import Course from "../../../../model/Course";
import {getCourseById} from "../../../../service/course.service";
import SpinnerComponent from "../../../../component/common/SpinnerComponent";
import {getInstructorByUserId, getInstructorDetail} from "../../../../service/instructor.service";
import usePrevious from "../../../../hook/usePrevious";

interface Props extends ControlComponentProps {
}

interface RouteParams {
    id: string
}

const InstructorCourseDetailComponent: React.FC<Props> = ({}) => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((s: RootState) => s.auth.user);
    const [instructor, setInstructor] = useState<Instructor>();
    const [course, setCourse] = useState<Course>({
        id: null,
        categoryId: '',
        instructorId: instructor?.id,
        name: '',
        author: '',
        price: 0,
        prePrice: 0,
        rating: 0,
        description: '',
        headline: '',
        image: '',
        concurrency: '',
        discount: 0,
        language: '',
        numReview: 0,
        numLecture: 0,
        estimateContentLength: 0,
        numStudentEnroll: 0,
        status: ''
    });
    const params: RouteParams = useParams()
    const previous = usePrevious({course})

    useEffect(() => {
        console.log('=========== InstructorCourseDetailComponent mouted ============')
        getInstructorByUserId(user?.id || '').then(instructor_ => setInstructor(instructor_));
    }, [])

    useEffect(() => {
    }, [course])

    useEffect(() => {
        loadData().then(r => setIsLoading(false));
    }, [user, params.id])

    const loadData = async () => {
        if (params.id) {
            if (params.id === 'new') {
                setCourse({...course, instructorId: instructor?.id})
            } else {
                const course_ = await getCourseById(params.id);
                setCourse(course_)
            }
        }
    }

    if (isLoading) {
        return <SpinnerComponent/>
    }

    if (instructor) {
        return (
            <div className={styles.instructorCourseDetail}>
                <TabView activeIndex={0} className={'profile-tabview'}>
                    <TabPanel header="Basic info">
                        <BasicCourseInfoComponent course={course} instructor={instructor}/>
                    </TabPanel>
                    <TabPanel header="Content">
                        <CourseContentComponent courseInfo={course}/>
                    </TabPanel>
                    <TabPanel header="Public">
                        <PublicCourseComponent course={course} instructor={instructor}/>
                    </TabPanel>
                </TabView>
            </div>
        );
    } else {
        return <span>Some thing broke</span>;
    }
}


export default InstructorCourseDetailComponent;
