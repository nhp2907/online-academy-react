import React, {useEffect, useState} from 'react'
import ReactQuill from "react-quill";
import {Button} from "primereact/button";
import {updateUserApi} from "../../../../service/user.service";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import Instructor from "../../../../model/Instructor";
import {getInstructorByUserId, getInstructorDetail, updateInstructorInfoApi} from "../../../../service/instructor.service";

interface Props {

}

const InstructorInfoComponent: React.FC<Props> = ({}) => {

    const user = useSelector((s: RootState) => s.auth.user);
    const [instructor, setInstructor] = useState<Instructor>()
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const [brief, setBrief] = useState('')

    useEffect(() => {
        if (user) {
            getInstructorByUserId(user?.id).then(instructor => {
                setBrief(instructor.brief || '');
                setInstructor(instructor)
            });
        }
    }, [user])

    return (
        <div style={{display: 'flex', flexDirection: "column"}}>
            <ReactQuill style={{height: '100%'}} value={brief} onChange={value => setBrief(value)}/>
            <Button label={'Save'}
                    disabled={!brief || brief.length === 0}
                    style={{alignSelf: "flex-end", marginTop: 10}}
                    onClick={async e => {
                        try {
                            await updateInstructorInfoApi({...instructor, brief})
                            showToastMessage({severity: 'success', summary: 'Update successfully!', detail: 'Update brief successfully!'});
                        } catch (err) {
                            showToastMessage({severity: 'error', summary: 'Failed!', detail: err.response?.data?.message || err.message});

                        }
                    }}/>
        </div>
    );
}


export default InstructorInfoComponent;