import {Button} from 'primereact/button';
import React, {useState} from 'react'
import CourseChapter from "../../../../../../../model/CourseChapter";
import CourseVideoInfo from "../../../../../../../model/CourseVideoInfo";
import CourseVideoCompoent from "./CourseVideoCompoent";
import {Dialog} from 'primereact/dialog';
import AddVideoComponent from "./AddVideoComponent";

interface Props {
    item?: CourseChapter,
}

const CourseChapterComponent: React.FC<Props> = ({item}) => {
    const [addVideoVisible, setAddVideoVisible] = useState(false);
    return (
        <div style={{margin: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h4 style={{marginRight: 20}}>Videos</h4>
                <Button icon="pi pi-plus" className="pm p-button-success p-button-rounded p-button-sm"
                        tooltip={'Add video'}
                        onClick={e => {
                            e.stopPropagation()
                            setAddVideoVisible(true);
                        }}
                />
            </div>
            {item?.videos?.map((videoInfo: CourseVideoInfo) => (
                <CourseVideoCompoent item={videoInfo}/>
            ))}
            <Dialog header={'Add chapter'} visible={addVideoVisible} onHide={() => setAddVideoVisible(false)}>
                <AddVideoComponent onCreateVideo={(video: CourseVideoInfo) => {
                    video = {...video, id: video.length + '1'}
                    setAddVideoVisible(false);
                }}/>
            </Dialog>
        </div>
    );
}


export default CourseChapterComponent;