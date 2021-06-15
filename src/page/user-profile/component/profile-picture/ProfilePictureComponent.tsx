import {Button} from 'primereact/button';
import React, {useEffect, useRef, useState} from 'react'
import styles from './profile-picture.module.scss'

interface Props {
    imageUrl?: string
}

const ProfilePictureComponent: React.FC<Props> = ({imageUrl}) => {
    const [uploadImageUrl, setUploadImageUrl] = useState<string | ArrayBuffer>('')
    const imageRef = useRef(null);
    const onImageUpload = (e: any) => {
        console.log(e)
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log('file', file)
            const url = file.name;
            const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
            if (ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg") {
                const reader = new FileReader();
                reader.onload = function (readerEvent) {
                    console.log('readerEvent.target?.result', readerEvent.target?.result);
                    // @ts-ignore
                    imageRef.current.setAttribute('src', readerEvent.target?.result)
                }
                reader.readAsDataURL(file);
            }
        } else {
            console.log('target', e.target);
        }
    }
    useEffect(() => {
        console.log(imageRef);
    })
    return (
        <div className={styles.main}>
            <h2>Your profile picture</h2>
            <div className={`${styles.imgContainer} p-shadow-7`}>
                <img src={imageUrl} alt="" ref={imageRef}
                     onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}/>
                <div className={styles.fileInputContainer}>
                    <label htmlFor="fileInput">
                        <span>Upload image</span>
                    </label>
                    <input id={'fileInput'} type={'file'} hidden onChange={onImageUpload}
                           accept="image/x-png,image/gif,image/jpeg"/>
                </div>
            </div>
            <div>
                <Button style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}} className={'p-button-success'} label={'Save'}/>
            </div>
        </div>
    );
}


export default ProfilePictureComponent;