import React, {useState} from 'react'
import CommonInput from "../../../../component/common/CommonInput";
import styles from "./profile-privacy.module.scss";
import {validateName, validatePassword, validateRepeatPassword} from "../../../../validator/user.validator";
import {Button} from "primereact/button";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {changePasswordApi} from "../../../../service/user.service";
import {Redirect} from 'react-router-dom';

interface Props {

}

const ProfilePrivacyComponent: React.FC<Props> = ({}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const user = useSelector((state: RootState) => state.auth.user);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    if (!user) {
        return <Redirect to={{pathname: '/login', state: {backUrl: '/profile'}}}/>
    }

    const validateCurrentPassword = (text: string) => text.length === 0 ? 'Password required' : ''
    const validateRepeatPassword = (text: string) => text !== newPassword ? 'Password does not match' : ''
    const validateInput = () => {
        let string = validateCurrentPassword(oldPassword) || validateCurrentPassword(newPassword) || validateRepeatPassword(repeatPassword);
        console.log('validate message', string);
        return string;
    }

    const isInputValid = !!validateInput()

    const changePassword = async () => {
        const message = validateInput()

        if (!message) {
            try {
                await changePasswordApi(user.id, {newPassword, oldPassword});
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'Password is updated', life: 3000});
            } catch (err) {
                showToastMessage({severity: 'error', summary: 'Failed', detail: err.response.data.message, life: 3000});
            }
        } else {
            showToastMessage({severity: 'error', summary: 'Failed', detail: message, life: 3000});
        }
    }

    return (
        <div className={styles.main}>
            <h3>Change your password</h3>
            <CommonInput value={oldPassword} placeholder={'Enter your current password'} name={'Current password'}
                         containerClassName={styles.commonInputContainer} type={'password'}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                         onChange={e => setOldPassword(e.target.value)}

                         validate={validateCurrentPassword}/>
            <CommonInput value={newPassword} placeholder={'Enter new password'} name={'New password'}
                         containerClassName={styles.commonInputContainer} type={'password'}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                         onChange={e => setNewPassword(e.target.value)}
                         validate={validateCurrentPassword}/>

            <CommonInput value={repeatPassword} placeholder={'Repeat new password'} name={'Repeat password:'}
                         containerClassName={styles.commonInputContainer} type={'password'}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                         onChange={e => setRepeatPassword(e.target.value)}
                         validate={validateRepeatPassword}/>
            <div className={styles.button}>
                <Button label={'Change'} disabled={isInputValid} onClick={changePassword}/>
            </div>
        </div>
    );
}


export default ProfilePrivacyComponent;