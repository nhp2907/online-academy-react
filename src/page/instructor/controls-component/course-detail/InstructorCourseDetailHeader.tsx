import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './course-detail.module.scss'

const InstructorCourseDetailHeader: React.FC<any> = ({title}) => {
    const history = useHistory();
    return (
        <div className={styles.instructorCourseDetailHeader}>
            <div onClick={() => history.push('/instructor/course')}>
                <span className={'pi pi-angle-left'} style={{color: 'white'}}/>
                <span>Back</span>
            </div>
            <h3>{title}</h3>
        </div>
    );
}


export default InstructorCourseDetailHeader;