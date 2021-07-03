import React, {useEffect, useState} from 'react'
import CourseInfoComponent from "../../component/course-detail/CourseInfoComponent";

import styles from '../../component/course-detail/course-detail.module.scss'
import CourseContentComponent from "../../component/course-detail/CourseContentComponent";
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
import {getCourseById} from "../../service/course.service";
import Course from "../../model/Course";
import Instructor from "../../model/Instructor";
import {getInstructorById} from '../../service/instructor.service'

interface Props {

}

interface RouteParams {
    id: string
}


const CourseDetailPage: React.FC<Props> = ({}) => {
    const params: RouteParams = useParams()
    const [course, setCourse] = useState<Course | null>(null);
    const [instructor, setInstructor] = useState<Instructor | null>(null);

    useEffect(() => {
        getCourseById(params.id).then((c: Course) => setCourse(course));
        getInstructorById(course?.instructorId || '').then(instructor => setInstructor(instructor));
    })

    const {topCourses} = useSelector((state: RootState) => state.home)
    const feedBack: CourseFeedBackInfo = {
        percents: [80, 10, 5, 3, 2],
        numReview: 300,
        rating: 4.9
    }
    const review: CourseReview = {
        content: 'This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!',
        createId: 'trunghoangto',
        createImage: '',
        creatorName: 'Tô Hoàng Trung\n',
        createdAt: '04/01/2021 8:33:18\n',
        updatedAt: ''
    }
    const reviews = [
        review, review, review, review
    ]
    return (
        <div className={styles.courseDetailPage}>
            <Nav/>
            <CourseInfoComponent/>
            <BuyTabComponent/>
            <CourseContentComponent/>
            <InstructorInfoComponent instructor={instructor}/>
            <RelatedCourseComponent courses={topCourses}/>
            <StudentFeedbackComponent item={feedBack}/>
            <ReviewsComponent items={reviews}/>
        </div>
    );
}


export default CourseDetailPage;