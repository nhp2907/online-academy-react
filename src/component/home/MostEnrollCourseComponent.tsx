import React from 'react'


import styles from '../../page/home/home.module.scss'

interface Props {

}

const MostEnrollCourseComponent : React.FC<Props> = ({}) => {
    return (
        <div className={`${styles['special-course']} ${styles['background-change']} ${styles['second']}`}>
            <h1>MostEnrollCourseComponent works</h1>
        </div>
    );
}


export default MostEnrollCourseComponent;