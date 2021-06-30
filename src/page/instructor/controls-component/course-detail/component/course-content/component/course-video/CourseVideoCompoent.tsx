import React from 'react'
import CourseVideoInfo from "../../../../../../../../model/CourseVideoInfo";

import styles from './course-video.module.scss'
import {Button} from 'primereact/button';

interface Props {
    item: CourseVideoInfo
}

const CourseVideoComponent: React.FC<Props> = ({item}) => {
    return (
        <div className={styles.courseVideo}>
            {/*<div className={styles.svgContainer}>*/}
            {/*<FontAwesomeIcon icon={faPlay}/>*/}
            {/*</div>*/}
            <Button className={'p-button-rounded p-button-secondary'} icon={'pi pi-play'}/>
            <span>{item.name}</span>
        </div>
    );
}


export default CourseVideoComponent;