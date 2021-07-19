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
import {currentEnv} from "../../config/evironment";
import {getLastPlayCourseApi} from "../../service/learning.service";
import './override.scss'

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
        getCourseById(params.courseId).then(r => {
            setCourse(r)
            getLastPlayCourseApi(user?.id, r.id).then(lastPlayVideo => {
                setPlayingVideo(lastPlayVideo);
            })
        })
    }, [params.courseId])

    if (!course) {
        return <SpinnerComponent/>
    }

    if (!user) {
        return <Redirect to={{pathname: '/login', state: {backUrl: `/my-learning/${course.id}`}}}/>
    }

    return (
        <div className={`${styles.myLearning} my-learning-page`}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <h3>{course.name}</h3>
                </div>
                <div className={styles.videoContainer}>
                    <VideoPlayer url={`${currentEnv.apiUrl}/api/course/${course.id}/chapter/${'chapterId'}/video/${playingVideo?.id}/stream`}/>
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