import React, {useState} from 'react'
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import CourseChapterComponent from "./component/CourseChapterComponent";
import CourseChapter from "../../../../../../model/CourseChapter";

import styles from './course-content.module.scss'
import './override.scss'
import AddChapterComponent from "./component/AddChapterComponent";

interface Props {

}

const CourseContentComponent: React.FC<Props> = ({}) => {
    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    const [activeIndex, setActiveIndex] = useState<number[]>([]);
    const [addVideoChapterVisible, setAddVideoChapterVisible] = useState(false);
    const [addChapterVisible, setAddChapterVisible] = useState(true);
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

    const renderHeader = (title: string, fn: () => void) => {
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

    const addChapterVideo = (chapterId: string) => {

    }

    return (
        <div className={`${styles.courseContent} instructor-course-content`}>
            <div className={styles.header}>
                <h3>Chapters</h3>
                <Button label={'Add chapter'} icon={'pi pi-plus'}
                        onClick={() => setAddChapterVisible(true)}/>
            </div>

            <Accordion multiple activeIndex={[0]}>
                {
                    chapters.map((chapter: CourseChapter) =>
                        <AccordionTab header={renderHeader(chapter.name, () => addChapterVideo(chapter.id ?? ""))}>
                            <CourseChapterComponent item={chapter}/>
                        </AccordionTab>
                    )
                }
                {/*<AccordionTab header={renderHeader('Chapter 1', () => addChapterVideo(''))}>*/}
                {/*    <CourseChapterComponent/>*/}
                {/*</AccordionTab>*/}
                {/*<AccordionTab header={renderHeader('Chapter 1', () => addChapterVideo(''))}>*/}
                {/*    cc*/}
                {/*</AccordionTab>*/}
                {/*<AccordionTab header={renderHeader('Chapter 1', () => addChapterVideo(''))}>*/}
                {/*    cc*/}
                {/*</AccordionTab>*/}
                {/*<AccordionTab header={renderHeader('Chapter 1', () => addChapterVideo(''))}>*/}
                {/*</AccordionTab>*/}
            </Accordion>
            <Dialog visible={addVideoChapterVisible} onHide={() => setAddVideoChapterVisible(false)}>

            </Dialog>

            <Dialog header={'Add chapter'} visible={addChapterVisible} onHide={() => setAddChapterVisible(false)}>
                <AddChapterComponent onChapterCreate={(chapter: CourseChapter) => {
                    setChapters([...chapters, chapter])
                    setAddChapterVisible(false);
                }}/>
            </Dialog>

        </div>
    );
}


export default CourseContentComponent;