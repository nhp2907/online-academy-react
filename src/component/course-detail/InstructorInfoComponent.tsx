import React from 'react'

import styles from './course-detail.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faAward, faUsers, faVideo} from '@fortawesome/free-solid-svg-icons'
import {Card} from 'primereact/card';
import Instructor from "../../model/Instructor";

interface Props {
    instructor: Instructor | null
}

const InstructorInfoComponent: React.FC<Props> = ({instructor}) => {
    return (
        <Card className={styles.instructor} title={'Instructor'}>
            <div className={styles.content}>
                <h3 className={styles.name}>{`${instructor?.firstName} ${instructor?.lastName}`}</h3>
                <div className={styles.instructorRating}>
                    <div className={styles.image}>
                        {
                            instructor?.image ? <img src="" alt="non"/> : ''
                        }
                    </div>
                    <div>
                        <InlineWithIcon icon={faStar} value={instructor?.rating + ' instructor rating'}/>
                        <InlineWithIcon icon={faAward} value={instructor?.numReview + ' reviews'}/>
                        <InlineWithIcon icon={faUsers} value={instructor?.numStudent + ' students'}/>
                        <InlineWithIcon icon={faVideo} value={instructor?.numCourse + ' courses'}/>
                    </div>
                </div>
                <div className={styles.instructorBrief} dangerouslySetInnerHTML={{__html: instructor?.brief || ''}}>
                </div>
            </div>
        </Card>
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