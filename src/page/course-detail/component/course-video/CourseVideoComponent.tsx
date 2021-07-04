import React from 'react'
import CourseVideoInfo from "../../../../model/CourseVideoInfo";
import {Button} from "primereact/button";
import styles from './course-video.module.scss'

interface Props {
    video: CourseVideoInfo
    index: number
}

const CourseVideoComponent: React.FC<Props> = ({video, index}) => {
    return (
        <div className={styles.courseVideo}>
            <span className={styles.index}>{`${index + 1}.`}</span>
            <Button className={'p-button-rounded p-button-secondary'} icon={'pi pi-play'}/>
            <span className={styles.name}>{video.name}</span>
        </div>
    );
}


export default CourseVideoComponent;