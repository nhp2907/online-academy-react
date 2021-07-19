import {Button} from 'primereact/button';
import React, {useEffect, useRef, useState} from 'react'
import styles from './profile-picture.module.scss'
import {uploadUserImageApi} from "../../../../service/user.service";
import {User} from "../../../../model/User";
import coverImage from "../../../../assets/img/image-placeholder.png";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

interface Props {
    imageUrl?: string
    user: User
}

const ProfilePictureComponent: React.FC<Props> = ({user}) => {
    const [imageFile, setImageFile] = useState<any>('')
    const imageRef = useRef(null);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const onImageUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setImageFile(file);

            const url = file.name;
            const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
            if (ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg") {
                const reader = new FileReader();
                reader.onload = function (readerEvent) {
                    // @ts-ignore
                    imageRef.current.setAttribute('src', readerEvent.target?.result)
                }
                reader.readAsDataURL(file);
            }
        } else {
            console.log('target', e.target);
        }
    }

    const uploadImage = async (e: any) => {
        if (imageFile) {
            try {
                const formData = new FormData();
                // @ts-ignore
                formData.append('image', imageFile);
                await uploadUserImageApi(user.id, formData);
                showToastMessage({severity: 'success', summary: 'Successfully', detail: 'Update image successfully'});
            } catch (err) {
                showToastMessage({severity: 'error', summary: 'Update failed!', detail: err.message})
            }
        }
    }

    return (
        <div className={styles.main}>
            <h2>Your profile picture</h2>
            <div className={`${styles.imgContainer} p-shadow-7`}>
                <img src={user.image} alt="" ref={imageRef}
                     onError={(e) => e.currentTarget.src = coverImage}
                />
                <div className={styles.fileInputContainer}>
                    <label htmlFor="fileInput">
                        <span>Upload image</span>
                    </label>
                    <input id={'fileInput'} type={'file'} hidden onChange={onImageUpload}
                           accept="image/x-png,image/gif,image/jpeg"/>
                </div>
            </div>
            <div>
                <Button style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}} className={'p-button-success'} label={'Save'}
                        onClick={uploadImage}/>
            </div>
        </div>
    );
}


export default ProfilePictureComponent;