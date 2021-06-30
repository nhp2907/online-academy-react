import { Button } from 'primereact/button';
import React from 'react'

import styles from './public-course.module.scss'

interface Props {

}

const PublicCourseComponent : React.FC<Props> = ({}) => {
    return (
        <div className={styles.publicCourse}>
            <span>Successfully! Your course is ready to public</span>
            <Button label={'Public now'} className={'p-button-danger'}/>
        </div>
    );
}


export default PublicCourseComponent;