import React, {useState} from 'react'
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import CourseChapterComponent from "./component/CourseChapterComponent";
import CourseChapter from "../../../../../../model/CourseChapter";

import styles from './course-content.module.scss'
import './override.scss'
import AddChapterComponent from "./component/AddChapterComponent";
import {useDispatch, useSelector} from 'react-redux';
import {createChapter} from '../../../../../../redux/instructor/instructSlice';
import {RootState} from "../../../../../../redux/store";
import {createCourseChapter} from "../../../../../../service/course.service";
import Course from "../../../../../../model/Course";

interface Props {
    courseInfo?: Course
}

const CourseContentComponent: React.FC<Props> = ({courseInfo}) => {
    const chapters_: CourseChapter[] = useSelector((s: RootState) => s.instructor.editingCourse.chapters)
    const dispatch = useDispatch();
    const [chapters, setChapters] = useState<CourseChapter[]>(chapters_);
    const [activeIndex, setActiveIndex] = useState<number[]>([]);
    const [addVideoChapterVisible, setAddVideoChapterVisible] = useState(false);
    const [addChapterVisible, setAddChapterVisible] = useState(false);
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

        setActiveIndex(_activeIndex);
    }

    const renderHeader = (title: string) => {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span style={{marginRight: 17}}>{title}</span>
                {/*<Button icon="pi pi-plus" className="p-mr-2 p-button-success p-button-sm" label={'Add video'}*/}
                {/*        onClick={e => {*/}
                {/*            e.stopPropagation()*/}
                {/*        }}*/}
                {/*/>*/}
            </div>
        )
    }
    if (!courseInfo || courseInfo.id == null) {
        return <span>Your course info is not ready!</span>
    } else {
        return (
            <div className={`${styles.courseContent} instructor-course-content`}>
                <div className={styles.header}>
                    <h3>Chapters</h3>
                    <Button label={'Add chapter'} icon={'pi pi-plus'}
                            onClick={() => {
                                setAddChapterVisible(true)
                            }}/>
                </div>
                <Accordion multiple activeIndex={[0]}>
                    {
                        chapters.map((chapter: CourseChapter) =>
                            <AccordionTab key={chapter.id} header={renderHeader(chapter.name)}>
                                <CourseChapterComponent item={chapter}/>
                            </AccordionTab>
                        )
                    }
                </Accordion>
                <Dialog header={'Add chapter'} visible={addChapterVisible} onHide={() => setAddChapterVisible(false)}>
                    <AddChapterComponent onChapterCreate={async (chapter: CourseChapter) => {
                        setChapters([...chapters, chapter])
                        setAddChapterVisible(false);
                        // @ts-ignore
                        await createCourseChapter(courseInfo.id, chapter);
                        dispatch(createChapter(chapter))
                    }}/>
                </Dialog>
            </div>
        );
    }
}


export default CourseContentComponent;