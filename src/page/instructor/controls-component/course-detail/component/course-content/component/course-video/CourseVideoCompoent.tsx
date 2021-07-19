import React from 'react'
import CourseVideoInfo from "../../../../../../../../model/CourseVideoInfo";
import {confirmPopup} from 'primereact/confirmpopup'; // To use confirmPopup method
import styles from './course-video.module.scss'
import {Button} from 'primereact/button';

interface Props {
    item: CourseVideoInfo
    index: number
    deleteAction: (item: CourseVideoInfo, index: number) => void;
}

const CourseVideoComponent: React.FC<Props> = ({item, index, deleteAction}) => {
    const deleteConfirm = (event: any, video: CourseVideoInfo, index: number) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteAction(video, index),
            reject: () => {
            }
        });
    }
    return (
        <div className={styles.courseVideo}>
            <span className={styles.index}>{`${index + 1}.`}</span>
            <Button className={'p-button-rounded p-button-secondary'} icon={'pi pi-play'}/>
            <span className={styles.name}>{item.name}</span>
            {/*<VideoPlayer*/}
            {/*    url={`http://localhost:4000/api/course/${item.courseId}/chapter/${item.chapterId}/video/${item.id}/stream`}/>*/}
            <Button className={`${styles.deleteButton} p-button-rounded p-button-danger`} icon={'pi pi-trash'}
                    onClick={(e: any) => {
                        deleteConfirm(e, item, index)
                    }}/>
        </div>
    );
}


export default CourseVideoComponent;
