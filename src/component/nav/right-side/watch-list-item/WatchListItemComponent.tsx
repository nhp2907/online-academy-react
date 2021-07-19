import React, {DetailedHTMLProps, HTMLAttributes} from 'react'
import {useHistory} from 'react-router-dom';
import Course from "../../../../model/Course";
import styles from './watch-list-item.module.scss'

interface Props {
    course: Course
    onClick: (e:any) => void
}

const WatchListItemComponent: React.FC<Props> = ({course, onClick}) => {
    const history = useHistory();
    return (
        <div className={styles.watchListItem} onClick={onClick}>
            <div className={styles.image}>
                <img src={course.image} alt=""/>
            </div>
            <div className={styles.info}>
                <span className={styles.name}>{course.name}</span>
                <span className={styles.author}>{course.author}</span>
                <span><small>price: </small><strong>{course.price}</strong> USD</span>
            </div>
        </div>
    );
}


export default WatchListItemComponent;