import React, {useState} from 'react'
import {User} from "../../../../../../../model/User";
import CommonInput from "../../../../../../../component/common/CommonInput";
import {validateEmail, validateName, validateUsername} from '../../../../../../../validator/user.validator'
import CommonSelect from "../../../../../../../component/common/CommonSelect";
import {Button} from 'primereact/button';
import styles from './user-input.module.scss'
import UserRole from "../../../../../../../model/UserRole";

interface Props {
    user: User
    onSubmit: (user: User) => void
    hideModal?: () => void
}

const UserInputComponent: React.FC<Props> = ({user, onSubmit, hideModal}) => {
    const [submitted, setSubmitted] = useState(false);
    const [formUser, setUser] = useState<User>(user);

    const onInputChange = (e: any, key: string) => {
        const val: number | string = (e.target && e.target.value) || '';
        const _user: User = {...formUser};
        console.log(_user);
        // @ts-ignore
        _user[key] = val;
        console.log(_user);
        console.log(val)

        setUser(_user);
    }
    const userRoleSelectItems = [
        {
            label: 'Student',
            value: 2
        },
        {
            label: 'Instructor',
            value: 3
        },
    ]
    const style = {marginTop: 15, marginBottom: 15}
    return (
        <div className={styles.userInput}>
            <div style={style}>
                <CommonInput value={formUser.username} name={'Username'} required
                             onChange={e => setUser({...formUser, username: e.target.value})}
                             validate={text => validateUsername(text)}/>
            </div>

            <div style={style}>
                <CommonInput value={formUser.firstName} name={'Firstname'} required
                             onChange={e => setUser({...formUser, firstName: e.target.value})}
                             validate={text => validateName(text, formUser.lastName)}/>
            </div>
            <div style={style}>
                <CommonInput value={formUser.lastName} name={'Lastname'} required
                             onChange={e => setUser({...formUser, lastName: e.target.value})}
                             validate={text => validateName(formUser.firstName, text)}/>
            </div>
            <div style={style}>
                <CommonInput value={formUser.email} name={'Email'} required
                             onChange={e => setUser({...formUser, email: e.target.value})}
                             validate={text => validateEmail(text)}/>
            </div>
            <div style={style}>
                <CommonSelect value={formUser.roleId} name={'Role'} required
                              items={userRoleSelectItems}
                              onChange={e => setUser({...formUser, roleId: parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button label={'Cancel'} className={`p-button-text ${styles.cancelButton}`}
                        onClick={() => hideModal ? hideModal() : ''}/>
                <Button label={'Submit'}
                        onClick={() => {
                            const role = UserRole[formUser.roleId || 0]
                            onSubmit(formUser)
                        }}/>
            </div>
            <div>
            </div>
        </div>
    );
}


export default UserInputComponent;