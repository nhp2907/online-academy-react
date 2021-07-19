import {Button} from 'primereact/button';
import React, {useState} from 'react'
import CommonInput from "../../../../../../../../component/common/CommonInput";

interface Props {
    onCreateVideo: (video: any) => void
}

const AddVideoComponent: React.FC<Props> = ({onCreateVideo}) => {
    const [file, setFile] = useState<File>();
    const [name, setName] = useState('');
    return (
        <div style={{padding: 5, width: 500}}>
            <CommonInput value={name} name={'Video title'} onChange={e => setName(e.target.value)}
                         inputStyle={{width: '100%'}} required
                         validate={(text: string) => text.length > 0 ? '' : 'Name is required'}/>
            <div style={{marginTop: 10, marginBottom: 10}}>
                <p className={'required'} style={{marginBottom: 4}}>Upload video</p>
                <label htmlFor="instructorCourseVideoUploader" className={'file-upload-label'}>
                    <span>Upload</span>
                    <span title={'Upload video'} className={`pi pi-upload`}/>
                </label>
                <span style={{margin: 5}}>{file?.name || ''}</span>
                <input id={'instructorCourseVideoUploader'} hidden type="file" onChange={(e: any) => {
                    setFile(e.target.files[0]);
                }}/>
            </div>
            <div style={{marginTop: 10, float: 'right'}}>
                <Button label={'Add'} disabled={name.length === 0 || file == null}
                        onClick={() => onCreateVideo({
                                name,
                                file
                            }
                        )}/>
            </div>
        </div>
    );
}


export default AddVideoComponent;