import {Button} from 'primereact/button';
import React, {useState} from 'react'
import CommonInput from "../../../../../../../../component/common/CommonInput";
import CourseChapter from "../../../../../../../../model/CourseChapter";

interface Props {
    onAction: (chapter: CourseChapter) => void
    mode: 'Add' | 'Update'
    value?: CourseChapter
}

const AddChapterComponent: React.FC<Props> = ({value, mode, onAction}) => {
    const [name, setName] = useState(value?.name ?? '')
    return (
        <div style={{padding: 5, width: 300}}>
            <CommonInput value={name} name={'Chapter name'} onChange={e => setName(e.target.value)}
                         inputStyle={{width: '100%'}} required
                         validate={(text: string) => text.length > 0 ? '' : 'Name is required'}/>
            <div style={{marginTop: 10, float: 'right'}}>
                <Button label={mode} disabled={name.length === 0} onClick={() => onAction({
                    ...value,
                    name
                })}/>
            </div>
        </div>
    );
}


export default AddChapterComponent;