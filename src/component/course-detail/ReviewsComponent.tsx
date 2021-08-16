import React, {useEffect, useState} from 'react'
import CourseReview from "../../model/CourseReview";

import styles from './course-detail.module.scss'
import CourseReviewItemComponent from "./molecule/coruse-review-item/CourseReviewItemComponent";
import {Card} from 'primereact/card';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {InputTextarea} from "primereact/inputtextarea";
import Course from "../../model/Course";
import {Button} from "primereact/button";
import {createCourseReviewApi, getCourseReviewApi, getCourseReviewByUserApi, updateCourseReviewApi} from "../../service/course.service";
import {Rating} from "primereact/rating";
import {Menubar} from "primereact/menubar";

interface Props {
    course: Course
    requestUpdateFeedBack?: () => void
}

const ReviewsComponent: React.FC<Props> = ({course, requestUpdateFeedBack}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const user = useSelector((s: RootState) => s.auth.user);
    const isUserOwnCourse: boolean = !!user && !!course.id && user.myLearningList.includes(course.id);
    const [reviewContent, setReviewContent] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const [reviews, setReviews] = useState<CourseReview[]>([])
    const [userReview, setUserReview] = useState<CourseReview>()

    useEffect(() => {
            getCourseReviewApi(course?.id, user?.id).then(r => {
                const filterReview = r.filter(rv => rv.userId !== user?.id);
                setReviews(filterReview)
            });
            getCourseReviewByUserApi(course?.id, user?.id).then(r => {
                setRating(r.rating)
                setReviewContent(r.content);
                setUserReview(r);
            })
        }, [course]
    )

    return (
        <Card className={styles.review} title={"Reviews"}>
            {
                isUserOwnCourse ? (<div style={{width: '100%', display: 'flex', flexDirection: "column"}}>
                    <p>Submit your review:</p>
                    <div style={{marginTop: 10, marginBottom: 10}}>

                        <Rating onChange={e => setRating(e.value || 0)} value={rating} cancel={false}
                        />
                    </div>
                    <InputTextarea style={{width: '100%', marginBottom: 15}} rows={4} value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}/>
                    <Button label={'Submit'}
                            style={{alignSelf: "flex-end"}}
                            disabled={reviewContent.length === 0 || rating === 0}
                            onClick={async e => {
                                try {
                                    if (userReview?.id) {
                                        await updateCourseReviewApi(course.id, {...userReview, rating, content: reviewContent})
                                        showToastMessage({severity: "success", summary: `Update review successfully`})
                                    } else {
                                        const newReview = await createCourseReviewApi(course.id, {
                                            courseId: course.id,
                                            rating,
                                            userId: user?.id,
                                            content: reviewContent
                                        })
                                        setUserReview(newReview);
                                        showToastMessage({severity: "success", summary: `Review successfully`})
                                    }
                                    if (requestUpdateFeedBack) {
                                        requestUpdateFeedBack()
                                    }
                                } catch (err) {
                                    showToastMessage({severity: "warn", summary: `Error occurred`, detail: err.response?.data?.message || err.message})
                                }
                            }}/>
                </div>) : ''
            }
            <div className={styles.content}>
                {
                    reviews.map((cr: CourseReview) => <CourseReviewItemComponent key={cr.id} item={cr}/>)
                }
            </div>
        </Card>
    );
}


export default ReviewsComponent;