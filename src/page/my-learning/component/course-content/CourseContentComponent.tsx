import React, {useEffect, useState} from 'react'
import Course from "../../../../model/Course";
import {getCourseChaptersApi} from "../../../../service/course.service";
import CourseChapter from "../../../../model/CourseChapter";
import {Accordion, AccordionTab} from "primereact/accordion";
import CourseChapterComponent from "../course-chapter/CourseChapterComponent";

interface Props {
    course?: Course
    setPlayingVideo: (video: any) => void
}

const CourseContentComponent: React.FC<Props> = ({course, setPlayingVideo}) => {
    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    useEffect(() => {
        getCourseChaptersApi(course?.id || '').then(r => setChapters(r));
    }, [course])

    return (
        <div> {
            <Accordion multiple activeIndex={[0]}>
                {
                    chapters.map((chapter: CourseChapter) =>
                        <AccordionTab key={chapter.id} header={chapter.name}>
                            <CourseChapterComponent chapter={chapter} setPlayingVideo={setPlayingVideo}/>
                        </AccordionTab>
                    )
                }
            </Accordion>
        }
        </div>
    );
}


export default CourseContentComponent;