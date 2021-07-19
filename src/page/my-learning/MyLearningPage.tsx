import React, {useEffect, useState} from 'react'
import {Redirect, useHistory, useParams, Prompt} from 'react-router-dom';
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
import {getLastPlayCourseApi, saveLearningStatus} from "../../service/learning.service";
import './override.scss'
import {Simulate} from "react-dom/test-utils";

interface Params {
    courseId: string
}

interface Props {

}

const MyLearningPage: React.FC<Props> = ({}) => {
    const user = useSelector((s: RootState) => s.auth.user);
    const params = useParams<Params>();
    const [playingVideo, setPlayingVideo] = useState<CourseVideoInfo>();
    const [playing, setPlaying] = useState<boolean>(false);
    const [course, setCourse] = useState<Course>()
    const [lastPlayStatus, setLastPlayStatus] = useState<any>();
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [chapterIndex, setChapterIndex] = useState(0);

    const courseId = course?.id;

    useEffect(() => {
        getCourseById(params.courseId).then(r => {
            setCourse(r)
            getLastPlayCourseApi(user?.id, r.id).then(lastPlayStatus_ => {
                console.log('last playig video', lastPlayStatus_);
                setLastPlayStatus(lastPlayStatus_)
                setPlayingVideo(lastPlayStatus_.video);
                setChapterIndex(lastPlayStatus_.chapterIndex)
            })
        })
    }, [params.courseId])

    useEffect(() => {
        // window.addEventListener('beforeunload', e => callSaveLearningStatus({
        //     userId: user?.id,
        //     courseId: course?.id,
        //     playedSeconds,
        //     videoId: playingVideo?.id
        // }))

        return () => {
            console.log('course', course)
            if (course) {
                const body = {
                    userId: user?.id,
                    courseId: course?.id,
                    playedSeconds,
                    chapterIndex,
                    videoId: playingVideo?.id
                };

                console.log(body);
                callSaveLearningStatus(body);
                // window.removeEventListener('beforeunload', callSaveLearningStatus)
            }
        }
    }, [course, playedSeconds, chapterIndex])

    const callSaveLearningStatus = (body: any) => {
        saveLearningStatus(body).then(r => {
        })
    }

    if (!course || !lastPlayStatus) {
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
                    <VideoPlayer playing={playing} currentTime={lastPlayStatus.playedSeconds}
                                 url={`${currentEnv.apiUrl}/api/course/${course.id}/chapter/${'chapterId'}/video/${playingVideo?.id}/stream`}
                                 playedSecondsChange={currentSecond => {
                                     setPlayedSeconds(currentSecond)
                                 }}
                    />
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
                <CourseContentComponent openingChapterIndex={chapterIndex} course={course} setPlayingVideo={(video: any, chapterIndex: number) => {
                    console.log(video)
                    setPlaying(true);
                    setPlayingVideo(video)
                    setChapterIndex(chapterIndex);
                }}/>
            </div>
        </div>
    );
}


export default MyLearningPage;