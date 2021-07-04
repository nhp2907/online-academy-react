import React, {useEffect, useState} from 'react'
import CourseInfoComponent from "../../component/course-detail/CourseInfoComponent";

import styles from '../../component/course-detail/course-detail.module.scss'
import InstructorInfoComponent from "../../component/course-detail/InstructorInfoComponent";
import RelatedCourseComponent from "../../component/course-detail/RelatedCourseComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useParams} from 'react-router-dom';
import StudentFeedbackComponent from "../../component/course-detail/StudentFeedbackComponent";
import CourseFeedBackInfo from "../../model/CourseFeedBackInfo";
import ReviewsComponent from "../../component/course-detail/ReviewsComponent";
import CourseReview from "../../model/CourseReview";
import Nav from "../../component/nav/Nav";
import BuyTabComponent from "../../component/course-detail/BuyTabComponent";
import {getCourseById, getCourseReviewApi} from "../../service/course.service";
import Course from "../../model/Course";
import Instructor from "../../model/Instructor";
import {getInstructorByUserId} from '../../service/instructor.service'
import CourseContentComponent from "./component/course-content/CourseContentComponent";
import {Card} from "primereact/card";

interface Props {

}

interface RouteParams {
    id: string
}


const CourseDetailPage: React.FC<Props> = ({}) => {
    const params: RouteParams = useParams()
    const [course, setCourse] = useState<Course>();
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [reviews, setReviews] = useState<CourseReview[]>([])

    useEffect(() => {
        getCourseById(params.id).then((c: Course) => setCourse(c));
        getInstructorByUserId(course?.instructorId || '').then(instructor => setInstructor(instructor));
        getCourseReviewApi(course?.id).then(r => setReviews(r));
    }, [])

    const {topCourses} = useSelector((state: RootState) => state.home)
    const feedBack: CourseFeedBackInfo = {
        percents: [80, 10, 5, 3, 2],
        numReview: 300,
        rating: 4.9
    }

    if (course) {
        return (
            <div className={styles.courseDetailPage}>
                <Nav/>
                <CourseInfoComponent course={course}/>
                <BuyTabComponent/>
                <Card title={'Course content'} className={styles.courseContent}>
                    <CourseContentComponent course={course}/>
                </Card>
                <InstructorInfoComponent instructor={instructor}/>
                <RelatedCourseComponent courses={topCourses}/>
                <StudentFeedbackComponent item={feedBack}/>
                <ReviewsComponent items={reviews}/>
            </div>
        );
    } else {
        return <span>Something broke</span>
    }
}


export default CourseDetailPage;