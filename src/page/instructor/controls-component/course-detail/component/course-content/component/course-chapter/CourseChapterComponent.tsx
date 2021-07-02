import {Button} from 'primereact/button';
import React, {useEffect, useState} from 'react'
import CourseChapter from "../../../../../../../../model/CourseChapter";
import CourseVideoInfo from "../../../../../../../../model/CourseVideoInfo";
import CourseVideoComponent from "../course-video/CourseVideoCompoent";
import {Dialog} from 'primereact/dialog';
import AddVideoComponent from "../course-video/AddVideoComponent";
import {createCourseVideoApi, getCourseVideoApi, deleteVideoApi} from '../../../../../../../../service/course.service';
import {RootState} from "../../../../../../../../redux/store";
import {useSelector} from 'react-redux';

interface Props {
    item?: CourseChapter
}

const CourseChapterComponent: React.FC<Props> = ({item}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const [videos, setVideos] = useState<CourseVideoInfo[]>(item?.videos || [])
    const [addVideoVisible, setAddVideoVisible] = useState(false);

    useEffect(() => {
        fetchData().then(r => {
        })
    }, [])
    const fetchData = async () => {
        const videos_ = await getCourseVideoApi(item?.courseId, item?.id);
        setVideos(videos_)
    }

    const createCourseVideo = async (video: any) => {
        const formData = new FormData();
        formData.append('file', video.file);
        formData.append('name', video.name);
        formData.append('chapterId', video.chapterId);
        try {
            const newVideo = await createCourseVideoApi(item?.courseId || '', formData);
            setVideos([...videos, newVideo])
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Add successfully!', detail: 'Add video successfully!'});
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Add failed!', detail: err.message})
        }
    }

    const deleteAction = async (item: any, index: any) => {
        try {
            await deleteVideoApi(item);
            setVideos(videos.filter(v => v.id !== item.id));
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Add failed!', detail: err.message})
        }
    }

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
            {videos.map((videoInfo: CourseVideoInfo, index) => (
                <CourseVideoComponent key={videoInfo.id} index={index} item={videoInfo} deleteAction={deleteAction}/>
            ))}
            <Dialog header={'Add chapter'} visible={addVideoVisible} onHide={() => setAddVideoVisible(false)}>
                <AddVideoComponent onCreateVideo={(newVideo: any) => {
                    setAddVideoVisible(false);
                    createCourseVideo({...newVideo, chapterId: item?.id || '', id: item?.videos?.length || ''})
                        .then(r => {
                        })
                }}/>
            </Dialog>
        </div>
    );
}


export default CourseChapterComponent;