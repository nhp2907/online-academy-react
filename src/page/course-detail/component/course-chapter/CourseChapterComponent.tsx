import React, {useEffect, useState} from 'react'
import CourseChapter from "../../../../model/CourseChapter";
import {getCourseVideoApi} from "../../../../service/course.service";
import CourseVideoInfo from "../../../../model/CourseVideoInfo";
import CourseVideoComponent from "../course-video/CourseVideoComponent";

interface Props {
    chapter?: CourseChapter
}

const CourseChapterComponent: React.FC<Props> = ({chapter}) => {
    const [videos, setVideos] = useState<CourseVideoInfo[]>([]);
    useEffect(() => {
        getCourseVideoApi(chapter?.courseId, chapter?.id || '').then(r => setVideos(r));
    }, [chapter])

    return (
        <div>
            {
                videos.map((v: CourseVideoInfo, index: number) => <CourseVideoComponent key={v.id} video={v} index={index}/>)
            }
        </div>
    );
}


export default CourseChapterComponent;