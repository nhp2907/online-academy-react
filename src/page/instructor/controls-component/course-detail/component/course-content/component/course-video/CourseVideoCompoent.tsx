import React from 'react'
import CourseVideoInfo from "../../../../../../../../model/CourseVideoInfo";

import styles from './course-video.module.scss'
import {Button} from 'primereact/button';

interface Props {
    item: CourseVideoInfo
    index: number
    deleteAction: (item: CourseVideoInfo, index: number) => void;
}

const CourseVideoComponent: React.FC<Props> = ({item, index, deleteAction}) => {
    return (
        <div className={styles.courseVideo}>
            <span className={styles.index}>{`${index + 1}.`}</span>
            <Button className={'p-button-rounded p-button-secondary'} icon={'pi pi-play'}/>
            <span className={styles.name}>{item.name}</span>
            <Button className={`${styles.deleteButton} p-button-rounded p-button-danger`} icon={'pi pi-trash'}
                    onClick={(e: any) => {
                        deleteAction(item, index);
                    }}/>
        </div>
    );
}


export default CourseVideoComponent;