import React, {useEffect, useState} from 'react'
import CourseChapter from "../../../../model/CourseChapter";
import {getCourseVideoApi} from "../../../../service/course.service";
import CourseVideoInfo from "../../../../model/CourseVideoInfo";
import CourseVideoComponent from "../course-video/CourseVideoComponent";
import Course from "../../../../model/Course";

interface Props {
    chapter?: CourseChapter
    setPlayingVideo: (video: any) => void
}

const CourseChapterComponent: React.FC<Props> = ({chapter, setPlayingVideo}) => {
    const [videos, setVideos] = useState<CourseVideoInfo[]>([]);
    useEffect(() => {
        getCourseVideoApi(chapter?.courseId, chapter?.id || '').then(r => setVideos(r));
    }, [chapter])

    return (
        <div>
            {
                videos.map((v: CourseVideoInfo, index: number) =>
                    <CourseVideoComponent key={v.id} video={v} index={index} setPlayingVideo={setPlayingVideo}/>)
            }
        </div>
    );
}


export default CourseChapterComponent;