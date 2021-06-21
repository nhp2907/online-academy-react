import React, {useEffect} from 'react'
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

interface Props {

}

interface RouteParams {
    id: string
}


const CourseDetailPage: React.FC<Props> = ({}) => {
    const params: RouteParams = useParams()
    useEffect(() => {
        console.log(params.id);
    })

    const {topCourses} = useSelector((state: RootState) => state.home)
    const feedBack:CourseFeedBackInfo = {
        percents: [80, 10, 5, 3, 2],
        numReview: 300,
        rating: 4.9
    }
    const review:CourseReview = {
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
            <Nav />
            <CourseInfoComponent/>
            <BuyTabComponent />
            <CourseContentComponent/>
            <InstructorInfoComponent/>
            <RelatedCourseComponent courses={topCourses}/>
            <StudentFeedbackComponent item={feedBack}/>
            <ReviewsComponent items={reviews}/>
        </div>
    );
}


export default CourseDetailPage;