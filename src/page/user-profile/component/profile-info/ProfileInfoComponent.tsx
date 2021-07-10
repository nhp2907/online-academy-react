import React, {useState} from 'react'
import CommonInput from "../../../../component/common/CommonInput";
import {User} from "../../../../model/User";
import {validate as userValidate, validateEmail, validateEmailExceptId, validateName, validateUsername} from "../../../../validator/user.validator";

import styles from './profile-info.module.scss'
import CommonSelect from "../../../../component/common/CommonSelect";
import {Button} from 'primereact/button';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {updateUserApi, validateUser} from "../../../../service/user.service";

interface Props {
    user: User | null
}

const ProfileInfoComponent: React.FC<Props> = ({user}) => {

    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const [updateUser, setUpdateUser] = useState(user);

    if (!updateUser) {
        return <h1>User not found!</h1>
    }

    const validateUser_ = async (user: User) => {
        return validateName(user.firstName, user.lastName)
    }

    const updateUserInfo = async (user: User) => {
        const validateMessage = await validateUser_(user);
        console.log(validateMessage);
        if (validateMessage) {
            showToastMessage({severity: 'error', detail: validateMessage, life: 3000});
        } else {
            console.log('info valid')
            try {
                await updateUserApi(user)
                showToastMessage({severity: 'success', summary: "Successfully", detail: 'Info is updated'})
            } catch (err) {
                showToastMessage({severity: 'error', summary: 'Update failed', detail: err.response.data.message, life: 3000});
            }
        }
    }

    return (
        <div className={styles.main}>
            <CommonInput value={updateUser.username} placeholder={'Username'} name={'Username:'}
                         containerClassName={styles.commonInputContainer} disabled
                         inputContainerClassName={styles.commonInputTextInputContainer}
                // onChange={e => setUser({...user, username: e.target.value})}
                //          validate={text => validateUsername(text)}
            />
            <div className={styles.nameWrapper}>
                <CommonInput value={updateUser.firstName} placeholder={'Firstname'} name={'Firstname:'}
                             onChange={e => setUpdateUser({...updateUser, firstName: e.target.value})}
                             containerClassName={styles.commonInputContainer}
                             inputContainerClassName={styles.commonInputTextInputContainer}
                    // validate={text => validateName(text, updateUser.lastName)}
                />
                <CommonInput value={updateUser.lastName} placeholder={'Lastname'} name={'Lastname:'}
                             onChange={e => setUpdateUser({...updateUser, lastName: e.target.value})}
                             containerClassName={styles.commonInputContainer}
                             inputContainerClassName={styles.commonInputTextInputContainer}
                    // validate={text => validateName(updateUser.firstName, text)}
                />
            </div>
            <CommonInput value={updateUser.email} placeholder={'Lastname'} name={'Lastname:'}
                         onChange={e => setUpdateUser({...updateUser, email: e.target.value})}
                         containerClassName={styles.commonInputContainer}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                         validate={text => validateEmailExceptId(text, updateUser.id)}
            />
            <div style={{marginTop: 30}}>
                <Button className={'p-button-success'} label={"Save"} style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}}
                        onClick={e => updateUserInfo(updateUser)}
                />
            </div>
        </div>
    );
}


export default ProfileInfoComponent;