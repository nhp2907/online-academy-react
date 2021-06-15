import React from 'react'
import Course from "../../../model/Course";

interface Props {
    course: Course
}

const WatchListItemComponent : React.FC<Props> = ({course}) => {
    return (
        <div>
            <span>{course.name}</span>
        </div>
    );
}


export default WatchListItemComponent;