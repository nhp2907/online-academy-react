import React, {useEffect, useState} from 'react'
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import CourseChapterComponent from "./component/course-chapter/CourseChapterComponent";
import CourseChapter from "../../../../../../model/CourseChapter";
import {confirmPopup} from 'primereact/confirmpopup'; // To use confirmPopup method
import styles from './course-content.module.scss'
import './override.scss'
import AddChapterComponent from "./component/course-chapter/AddChapterComponent";
import {createCourseChapter, createCourseVideoApi, deleteCourseChapterApi, getCourseChaptersApi, updateCourseChapterApi} from "../../../../../../service/course.service";
import Course from "../../../../../../model/Course";
import {RootState} from "../../../../../../redux/store";
import {useSelector} from 'react-redux';

interface Props {
    courseInfo?: Course
}

const CourseContentComponent: React.FC<Props> = ({courseInfo}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    // const dispatch = useDispatch();
    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    const [activeIndex, setActiveIndex] = useState<number[]>([]);
    const [addChapterVisible, setAddChapterVisible] = useState(false);
    const [updateChapterVisible, setUpdateChapterVisible] = useState(false);
    const [updateChapter, setUpdateChapter] = useState<CourseChapter>()

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

    const renderHeader = (chapter: CourseChapter) => {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span style={{marginRight: 17}}>{chapter.name}</span>
                <div>
                    <Button icon="pi pi-pencil" className="p-mr-2 p-button-success p-button-rounded p-button-sm" label={''}
                            style={{marginRight: 10}}
                            onClick={e => {
                                e.stopPropagation()
                                setUpdateChapter(chapter);
                                setUpdateChapterVisible(true);
                            }}
                    />
                    <Button icon="pi pi-trash" className="p-mr-2 p-button-danger p-button-rounded p-button-sm" label={''}
                            onClick={e => {
                                e.stopPropagation()
                                confirmDeleteChapter(e, chapter)
                            }}
                    />
                </div>
            </div>
        )
    }
    const confirmDeleteChapter = (event: any, chapter: CourseChapter) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await deleteCourseChapterApi(chapter.courseId, chapter.id);
                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Remove successfully!', detail: 'Remove chapter successfully!'});
                const chapters_ = await getCourseChaptersApi(chapter.courseId ?? '');
                setChapters(chapters_);
            },
            reject: () => {
            }
        });
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
                                        <AccordionTab key={chapter.id} header={renderHeader(chapter)}>
                                            <CourseChapterComponent item={chapter}/>
                                        </AccordionTab>
                                    )
                                }
                            </Accordion>
                    }
                </div>
                <Dialog header={'Add chapter'} visible={addChapterVisible} onHide={() => setAddChapterVisible(false)}>
                    <AddChapterComponent mode={'Add'} onAction={async (chapter: CourseChapter) => {
                        setAddChapterVisible(false);
                        // @ts-ignore
                        const newChapter = await createCourseChapter(courseInfo.id, chapter);
                        setChapters([...chapters, newChapter])
                        // dispatch(createChapter(chapter))
                    }}/>
                </Dialog>
                <Dialog header={'Edit chapter'} visible={updateChapterVisible} onHide={() => setUpdateChapterVisible(false)}>
                    <AddChapterComponent value={updateChapter} mode={'Update'} onAction={async (chapter: CourseChapter) => {
                        // setChapters([...chapters, chapter])
                        await updateCourseChapterApi(courseInfo.id || '', chapter);
                        const chapters_ = await getCourseChaptersApi(courseInfo.id || '');
                        setChapters(chapters_);
                        setUpdateChapterVisible(false);
                        // dispatch(createChapter(chapter))
                    }}/>
                </Dialog>
            </div>
        );
    }
}


export default CourseContentComponent;