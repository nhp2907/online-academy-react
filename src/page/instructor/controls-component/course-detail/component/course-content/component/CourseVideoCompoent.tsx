import React from 'react'
import CourseVideoInfo from "../../../../../../../model/CourseVideoInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from '@fortawesome/free-solid-svg-icons'

interface Props {
    item: CourseVideoInfo
}

const CourseVideoCompoent: React.FC<Props> = ({item}) => {
    return (
        <div>
            <FontAwesomeIcon icon={faPlay}/>
            <span>{item.name}</span>
        </div>
    );
}


export default CourseVideoCompoent;