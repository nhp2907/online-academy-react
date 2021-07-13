import React, {useEffect, useState} from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom';
import Nav from "../../component/nav/Nav";
import VideoPlayer from "../../component/common/VideoPlayer";
import CourseVideoInfo from "../../model/CourseVideoInfo";
import CourseContentComponent from "./component/course-content/CourseContentComponent";
import Course from "../../model/Course";
import SpinnerComponent from "../../component/common/SpinnerComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getCourseApi, getCourseById} from "../../service/course.service";
import styles from './my-learning.module.scss'
import {apiUrl} from "../../config/evironment";

interface Params {
    courseId: string
}

interface Props {

}

const MyLearningPage: React.FC<Props> = ({}) => {
    const user = useSelector((s: RootState) => s.auth.user);
    const params = useParams<Params>();
    const [playingVideo, setPlayingVideo] = useState<CourseVideoInfo>();
    const [course, setCourse] = useState<Course>()

    useEffect(() => {
        getCourseById(params.courseId).then(r => setCourse(r))
    }, [params.courseId])

    if (!course) {
        return <SpinnerComponent/>
    }

    if (!user) {
        return <Redirect to={{pathname: '/login', state: {backUrl: `/my-learning/${course.id}`}}}/>
    }

    return (
        <div className={styles.myLearning}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <h2>{course.name}</h2>
                    <span>{course.author}</span>
                </div>
                <div className={styles.videoContainer}>
                    <VideoPlayer url={`${apiUrl}/api/course/${course.id}/chapter/${'chapterId'}/video/${playingVideo?.id}/stream`}/>
                </div>
                <div className={styles.videoInfo}>
                    <span><small>Chapter </small>{playingVideo?.name || 'Chapter 1'}</span>
                    <h3>{playingVideo?.name || 'Video name here'}</h3>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <h3>Course content</h3>
                </div>
                <CourseContentComponent course={course} setPlayingVideo={video => {
                    console.log(video)
                    setPlayingVideo(video)
                }}/>
            </div>
        </div>
    );
}


export default MyLearningPage;