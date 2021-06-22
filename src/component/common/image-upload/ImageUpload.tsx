import React, {useEffect, useRef} from 'react'
import './upload-image.scss'

interface Props {
    imageUrl?: string
    onChange?: (e: any) => void
    title?: string
}

const ImageUpload: React.FC<Props> = ({imageUrl, onChange, title}) => {
    const imageRef = useRef(null);
    const onImageUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (onChange) {
                console.log('upload file: ', file);
                onChange(file);
            }
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
    useEffect(() => {
    }, [])
    return (
        <div className={'oar-image-upload-component-container'}>
            <h2>{title}</h2>
            <div className={'image-container p-shadow-7'}>
                <img src={imageUrl} alt="" ref={imageRef}
                     onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}/>
                <div className="file-input-container">
                    <label htmlFor="fileInput">
                        <span>Upload image</span>
                    </label>
                    <input id={'fileInput'} type={'file'} hidden onChange={onImageUpload}
                           accept="image/x-png,image/gif,image/jpeg"/>
                </div>
            </div>
            {/*<div>*/}
            {/*    <Button style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}} className={'p-button-success'} label={'Save'}/>*/}
            {/*</div>*/}
        </div>
    );
}


export default ImageUpload;