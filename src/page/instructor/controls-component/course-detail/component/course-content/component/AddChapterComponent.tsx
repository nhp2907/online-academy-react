import {Button} from 'primereact/button';
import React, {useState} from 'react'
import CommonInput from "../../../../../../../component/common/CommonInput";
import CourseChapter from "../../../../../../../model/CourseChapter";

interface Props {
    onChapterCreate: (chapter: CourseChapter) => void
}

const AddChapterComponent: React.FC<Props> = ({onChapterCreate}) => {
    const [name, setName] = useState('')
    return (
        <div style={{padding: 5, width: 300}}>
            <CommonInput value={name} name={'Chapter name'} onChange={e => setName(e.target.value)}
                         inputStyle={{width: '100%'}} required
                         validate={(text: string) => text.length > 0 ? '' : 'Name is required'}/>
            <div style={{marginTop: 10, float: 'right'}}>
                <Button label={'Add'} disabled={name.length == 0} onClick={() => onChapterCreate({
                    name, videos: [
                        {
                            id: '1',
                            name: 'video 1',
                            videoUrl: 'videoUrl'
                        }
                    ]
                })}/>
            </div>
        </div>
    );
}


export default AddChapterComponent;