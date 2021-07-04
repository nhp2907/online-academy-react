import React, {useState} from 'react'
import CourseReview from "../../../model/CourseReview";

interface Props {
    item: CourseReview
}

const CourseReviewItemComponent: React.FC<Props> = ({item}) => {

    return (
        <div style={{display: 'flex', alignItems: "flex-start", padding: 10, borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
            <img src="" alt="" style={{backgroundColor: 'gray', width: 50, height: 50, marginRight: 10}}/>
            <div>
                <div style={{display: 'flex'}}>
                    <div>
                        <h3>{item.userName}</h3>
                        <span>{item.createdAt}</span>
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <p>{item.content}</p>
                </div>
            </div>
        </div>
    );
}


export default CourseReviewItemComponent;