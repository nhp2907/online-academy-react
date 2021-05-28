import React from 'react'

import styles from './course-detail.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faAward, faUsers, faVideo} from '@fortawesome/free-solid-svg-icons'
interface Props {

}

const InstructorInfoComponent: React.FC<Props> = ({}) => {
    const instructor = {
        name: 'Nguyen Hoang Phuc',
        rating: 4.5,
        numReview: 1000,
        numStudent: 1000,
        numCourse: 18
    }
    return (
        <div className={styles.instructor}>
            <h3 className={styles.title}>Instructor</h3>
            <div className={styles.content}>
                <h3 className={styles.name}>{instructor.name}</h3>
                <div className={styles.instructorRating}>
                    <img src="" alt=""/>
                    <div>
                        <InlineWithIcon icon={faStar} value={instructor.rating + ' instructor rating'}/>
                        <InlineWithIcon icon={faAward} value={instructor.numReview + ' reviews'}/>
                        <InlineWithIcon icon={faUsers} value={instructor.numStudent + ' students'}/>
                        <InlineWithIcon icon={faVideo} value={instructor.numCourse + ' courses'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface InlineProps {
    icon: any;
    value: string | number;
}

const InlineWithIcon: React.FC<InlineProps> = ({icon, value}) => {
    return (
        <div>
            <FontAwesomeIcon icon={icon} color={'#FFA500'} style={{marginRight: 20, textAlign: "center", width: 30}}/>
            <span>{value}</span>
        </div>
    )
}


export default InstructorInfoComponent;