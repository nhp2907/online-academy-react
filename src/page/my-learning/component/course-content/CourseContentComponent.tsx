import React, {useEffect, useState} from 'react'
import Course from "../../../../model/Course";
import {getCourseChaptersApi} from "../../../../service/course.service";
import CourseChapter from "../../../../model/CourseChapter";
import {Accordion, AccordionTab} from "primereact/accordion";
import CourseChapterComponent from "../course-chapter/CourseChapterComponent";

interface Props {
    course?: Course
    setPlayingVideo: (video: any, chapterIndex: number) => void
    openingChapterIndex: number
}

const CourseContentComponent: React.FC<Props> = ({course, setPlayingVideo, openingChapterIndex}) => {

    const [activeIndex, setActiveIndex] = useState<number[]>([0])

    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    useEffect(() => {
        getCourseChaptersApi(course?.id || '').then(r => setChapters(r));
    }, [course])

    useEffect(() => {
        console.log('=>>> opening chapterindex', openingChapterIndex)
        onClick(openingChapterIndex)
    }, [openingChapterIndex])

    const onClick = (itemIndex: number) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        } else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            } else {
                _activeIndex.splice(index, 1);
            }
        }

        console.log(_activeIndex)
        setActiveIndex(_activeIndex);
    }

    return (
        <div> {
            <Accordion multiple activeIndex={activeIndex}>
                {
                    chapters.map((chapter: CourseChapter, index: number) =>
                        <AccordionTab key={chapter.id} header={chapter.name}>
                            <CourseChapterComponent chapter={chapter} setPlayingVideo={(video: any) => setPlayingVideo(video, index)}/>
                        </AccordionTab>
                    )
                }
            </Accordion>
        }
        </div>
    );
}


export default CourseContentComponent;