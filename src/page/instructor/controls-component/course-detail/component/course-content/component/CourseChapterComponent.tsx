import { Button } from 'primereact/button';
import React, { useState } from 'react'
import CourseChapter from "../../../../../../../model/CourseChapter";
import CourseVideoInfo from "../../../../../../../model/CourseVideoInfo";
import CourseVideoCompoent from "./CourseVideoCompoent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

interface Props {
    item?: CourseChapter
}

const CourseChapterComponent : React.FC<Props> = ({item}) => {
    return (
        <div style={{margin: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h4 style={{marginRight: 20}}>Course videos</h4>
                <Button icon="pi pi-plus" className="pm p-button-success p-button-rounded p-button-sm"
                        tooltip={'Add video'}
                        onClick={e => {
                            e.stopPropagation()
                        }}
                />
            </div>
            {item?.videos?.map((videoInfo: CourseVideoInfo) => (
               <CourseVideoCompoent item={videoInfo}/>
            ))}
        </div>
    );
}


export default CourseChapterComponent;