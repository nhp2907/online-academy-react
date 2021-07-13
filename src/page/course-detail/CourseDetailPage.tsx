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
import BuyTabComponent from "../../component/course-detail/buy-tab/BuyTabComponent";
import {getCourseById, getCourseFeedBackApi, getCourseReviewApi, getRelatedCourseApi, plusCourseViewsApi} from "../../service/course.service";
import Course from "../../model/Course";
import Instructor from "../../model/Instructor";
import {getInstructorDetail} from '../../service/instructor.service'
import CourseContentComponent from "./component/course-content/CourseContentComponent";
import {Card} from "primereact/card";
import SpinnerComponent from "../../component/common/SpinnerComponent";

interface Props {

}

interface RouteParams {
    id: string
}


const CourseDetailPage: React.FC<Props> = ({}) => {
    const initialFeedBack: CourseFeedBackInfo = {
        percents: [1, 1, 1, 1, 1],
        numReview: 0,
        rating: 0
    }

    const params: RouteParams = useParams()
    const [course, setCourse] = useState<Course>();
    const [instructor, setInstructor] = useState<Instructor>();
    const [reviews, setReviews] = useState<CourseReview[]>([])
    const [feedBack, setFeedBack] = useState<any>(initialFeedBack)
    const [relatedCourse, setRelatedCourses] = useState<Course[]>([])

    useEffect(() => {
        getCourseById(params.id).then((c: Course) => {
            setCourse(c)
            getInstructorDetail(c.instructorId).then(instructor => setInstructor(instructor));
            getCourseFeedBackApi(c?.id).then(r => setFeedBack(r));
            getCourseReviewApi(c?.id).then(r => setReviews(r));
            getRelatedCourseApi(c.id).then(r => setRelatedCourses(r))

            setTimeout(() => {
                plusCourseViewsApi(c.id);
            }, 5 * 60 * 1000) // 5 minutes
        });
    }, [params.id])

    if (course && instructor) {
        return (
            <div className={styles.courseDetailPage}>
                <Nav/>
                <CourseInfoComponent course={course} instructor={instructor}/>
                <BuyTabComponent course={course}/>
                <Card title={'Course content'} className={styles.courseContent}>
                    <CourseContentComponent course={course}/>
                </Card>
                <Card title={'Description'}
                      className={styles.description}>
                    <div className={styles.descriptionContent}
                         dangerouslySetInnerHTML={{__html: course.description}}>
                    </div>
                </Card>
                <InstructorInfoComponent instructor={instructor}/>
                <RelatedCourseComponent courses={relatedCourse}/>
                <StudentFeedbackComponent item={feedBack}/>
                <ReviewsComponent items={reviews}/>
            </div>
        );
    } else {
        return <div style={{height: '100vh', width: '100vw'}}>
            <SpinnerComponent/>
        </div>
    }
}


export default CourseDetailPage;