import React, {useEffect, useState} from 'react'
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import CourseChapterComponent from "./component/course-chapter/CourseChapterComponent";
import CourseChapter from "../../../../../../model/CourseChapter";

import styles from './course-content.module.scss'
import './override.scss'
import AddChapterComponent from "./component/course-chapter/AddChapterComponent";
import {createCourseChapter, getCourseChaptersApi} from "../../../../../../service/course.service";
import Course from "../../../../../../model/Course";
import CourseVideoInfo from "../../../../../../model/CourseVideoInfo";

interface Props {
    courseInfo?: Course
}

const CourseContentComponent: React.FC<Props> = ({courseInfo}) => {
    // const chapters_: CourseChapter[] = useSelector((s: RootState) => s.instructor.editingCourse.chapters)
    // const dispatch = useDispatch();
    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    const [activeIndex, setActiveIndex] = useState<number[]>([]);
    const [addChapterVisible, setAddChapterVisible] = useState(false);

    useEffect(() => {
        fetchData().then(_ => {
        })
    }, [courseInfo?.id])

    const fetchData = async () => {
        if (courseInfo && courseInfo.id) {
            const chapters_ = await getCourseChaptersApi(courseInfo.id);
            setChapters(chapters_);
        }
    }

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

    const createCourseVideo = (video: CourseVideoInfo) => {
        console.log('create course video')
        const newChapters: CourseChapter[] = [];
        chapters.forEach(c => {
            if (c.id !== video.chapterId) {
                newChapters.push(c);
            } else {
                const videos_ = c.videos ? [...c.videos] : [];
                newChapters.push({...c, videos: [...videos_, video]});
            }
        })
        setChapters(newChapters);
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
                <div className={styles.contentContainer}>
                    {
                        chapters.length === 0 ?
                            <span style={{fontSize: 16}}>Your course is emtpy! Add a chapter now.</span> :
                            <Accordion multiple activeIndex={[0]}>
                                {
                                    chapters.map((chapter: CourseChapter) =>
                                        <AccordionTab key={chapter.id} header={renderHeader(chapter.name)}>
                                            <CourseChapterComponent createCourseVideo={createCourseVideo} item={chapter}/>
                                        </AccordionTab>
                                    )
                                }
                            </Accordion>
                    }
                </div>
                <Dialog header={'Add chapter'} visible={addChapterVisible} onHide={() => setAddChapterVisible(false)}>
                    <AddChapterComponent onChapterCreate={async (chapter: CourseChapter) => {
                        setChapters([...chapters, chapter])
                        setAddChapterVisible(false);
                        // @ts-ignore
                        await createCourseChapter(courseInfo.id, chapter);
                        // dispatch(createChapter(chapter))
                    }}/>
                </Dialog>
            </div>
        );
    }
}


export default CourseContentComponent;