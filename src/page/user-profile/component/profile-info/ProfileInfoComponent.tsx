import React, {useState} from 'react'
import CommonInput from "../../../../component/common/CommonInput";
import {User} from "../../../../model/User";
import {validateEmail, validateName, validateUsername} from "../../../../validator/user.validator";

import styles from './profile-info.module.scss'
import CommonSelect from "../../../../component/common/CommonSelect";
import { Button } from 'primereact/button';

interface Props {
    user: User | null
}

const ProfileInfoComponent: React.FC<Props> = ({user}) => {
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    if (!user) {
        return <h1>User not found!</h1>
    }

    const getDateOptions = (start: number, end: number): ({ value: any, label: any })[] => {
        const res: number[] = [];
        for (let i = start; i <= end; i++) {
            res.push(i);
        }
        return res.map(i => ({value: i, label: i}))
    }

    return (
        <div className={styles.main}>
            <CommonInput value={user.username} placeholder={'Username'} name={'Username:'}
                         containerClassName={styles.commonInputContainer} disabled
                         inputContainerClassName={styles.commonInputTextInputContainer}
                // onChange={e => setUser({...user, username: e.target.value})}
                         validate={text => validateUsername(text)}/>
            <div className={styles.nameWrapper}>
                <CommonInput value={user.firstName} placeholder={'Firstname'} name={'Firstname:'}
                             containerClassName={styles.commonInputContainer}
                             inputContainerClassName={styles.commonInputTextInputContainer}
                    // onChange={e => setUser({...user, username: e.target.value})}
                             validate={text => validateName(user.firstName, user.lastName)}/>
                <CommonInput value={user.lastName} placeholder={'Lastname'} name={'Lastname:'}
                             containerClassName={styles.commonInputContainer}
                             inputContainerClassName={styles.commonInputTextInputContainer}
                    // onChange={e => setUser({...user, username: e.target.value})}
                             validate={text => validateName(user.firstName, user.lastName)}/>
            </div>
            <CommonInput value={user.email} placeholder={'Lastname'} name={'Lastname:'}
                         containerClassName={styles.commonInputContainer}
                         inputContainerClassName={styles.commonInputTextInputContainer}
                // onChange={e => setUser({...user, username: e.target.value})}
                         validate={text => validateEmail(user.email)}/>
            <div className={styles.birthDateWrapper}>
                <label>Birthdate:</label>
                <div>
                    <CommonSelect items={getDateOptions(1, 31)}
                                  onChange={e => setDate(e.target.value)}
                                  containerClassName={styles.commonSelectContainer}
                                  inputContainerClassName={styles.selectContainer}
                                  value={date} placeholder={"Day"}/>
                    <CommonSelect items={getDateOptions(1, 12)}
                                  onChange={e => setMonth(e.target.value)}
                                  containerClassName={styles.commonSelectContainer}
                                  inputContainerClassName={styles.selectContainer}
                                  value={month} placeholder={"Month"}/>
                    <CommonSelect items={getDateOptions(1900, 2021).reverse()}
                                  containerClassName={styles.commonSelectContainer}
                                  inputContainerClassName={styles.selectContainer}
                                  onChange={e => setYear(e.target.value)}
                                  value={year} placeholder={"Year"}/>
                </div>
            </div>
            <div>
                <Button className={'p-button-success'} label={"Save"} style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}} />
            </div>
        </div>
    );
}


export default ProfileInfoComponent;