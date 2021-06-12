import React from 'react'

import  styles from '../search-result-page.module.scss'

interface Props {

}

const ListCourseComponent : React.FC<Props> = ({}) => {
    return (
        <div className={styles.listCourse}>
            <h1>ListCourseComponent works</h1>
        </div>
    );
}


export default ListCourseComponent;