import React, {useState} from 'react'
import CommonInput from "../../../../component/common/CommonInput";
import {User} from "../../../../model/User";
import {validate as userValidate, validateEmail, validateName, validateUsername} from "../../../../validator/user.validator";

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
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const [updateUser, setUpdateUser] = useState(user);

    if (!updateUser) {
        return <h1>User not found!</h1>
    }

    const getDateOptions = (start: number, end: number): ({ value: any, label: any })[] => {
        const res: number[] = [];
        for (let i = start; i <= end; i++) {
            res.push(i);
        }
        return res.map(i => ({value: i, label: i}))
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
                // onChange={e => setUpdateUser({...updateUser, email: e.target.value})}
                         disabled
                         containerClassName={styles.commonInputContainer}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                // validate={text => validateEmail(updateUser.email)}
            />
            {/*<div className={styles.birthDateWrapper}>*/}
            {/*    <label>Birthdate:</label>*/}
            {/*    <div>*/}
            {/*        <CommonSelect items={getDateOptions(1, 31)}*/}
            {/*                      onChange={e => setDate(e.target.value)}*/}
            {/*                      containerClassName={styles.commonSelectContainer}*/}
            {/*                      inputContainerClassName={styles.selectContainer}*/}
            {/*                      value={date} placeholder={"Day"}/>*/}
            {/*        <CommonSelect items={getDateOptions(1, 12)}*/}
            {/*                      onChange={e => setMonth(e.target.value)}*/}
            {/*                      containerClassName={styles.commonSelectContainer}*/}
            {/*                      inputContainerClassName={styles.selectContainer}*/}
            {/*                      value={month} placeholder={"Month"}/>*/}
            {/*        <CommonSelect items={getDateOptions(1900, 2021).reverse()}*/}
            {/*                      containerClassName={styles.commonSelectContainer}*/}
            {/*                      inputContainerClassName={styles.selectContainer}*/}
            {/*                      onChange={e => setYear(e.target.value)}*/}
            {/*                      value={year} placeholder={"Year"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={{marginTop: 30}}>
                <Button className={'p-button-success'} label={"Save"} style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}}
                        onClick={e => updateUserInfo(updateUser)}
                />
            </div>
        </div>
    );
}


export default ProfileInfoComponent;