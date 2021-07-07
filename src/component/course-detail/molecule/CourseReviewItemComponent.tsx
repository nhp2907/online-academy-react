import React, {useEffect, useState} from 'react'
import CourseReview from "../../../model/CourseReview";
import {Avatar} from "primereact/avatar";

interface Props {
    item: CourseReview
}

const CourseReviewItemComponent: React.FC<Props> = ({item}) => {
    useEffect(() => {
        // console.log('item.image', item.userImage);
    }, [])
    return (
        <div style={{display: 'flex', alignItems: "flex-start", padding: 10, borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
            {
                item.userImage ?
                    <Avatar style={{marginRight: 10}}
                            image={item.userImage}
                            className="p-mr-2" size="xlarge" shape="circle"/> :
                    <Avatar label={`${item.userFirstName.substring(0, 1)}${item.userLastName.substring(0, 1)}`.toUpperCase()}
                            style={{marginRight: 10}}
                            className="p-mr-2" size="xlarge" shape="circle"/>
            }
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