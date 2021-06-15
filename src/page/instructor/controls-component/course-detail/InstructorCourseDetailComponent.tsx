import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ControlComponentProps from "../../../management-page/model/ControlComponentProps";
import Course from "../../../../model/Course";

interface Props extends ControlComponentProps{
}

interface RouteParams {
    id: string
}

const InstructorCourseDetailComponent : React.FC<Props> = ({}) => {
    const params: RouteParams = useParams()
    useEffect(() => {
        console.log(params);
    })
    return (
        <div>
            <h1>InstructorCourseDetailComponent works</h1>
        </div>
    );
}


export default InstructorCourseDetailComponent;