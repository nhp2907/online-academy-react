import React, {useState} from 'react'
import {User} from "../../../../../../model/User";
import UserRole from "../../../../../../model/UserRole";
import CommonInput from "../../../../../../component/common/CommonInput";
import {
    validateEmail,
    validateName,
    validatePassword, validateRepeatPassword,
    validateUsername
} from '../../../../../../validator/user.validator'

interface Props {

}

const UserInputComponent: React.FC<Props> = ({}) => {
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: '',
        roleId: UserRole.Student
    });

    const onInputChange = (e: any, key: string) => {
        const val: number | string = (e.target && e.target.value) || '';
        const _user: User = {...user};
        console.log(_user);
        // @ts-ignore
        _user[key] = val;
        console.log(_user);
        console.log(val)

        setUser(_user);
    }

    return (
        <div>
            <CommonInput value={user.username} placeholder={'Username'} name={'Username'}
                         onChange={e => setUser({...user, username: e.target.value})}
                         validate={text => validateUsername(text)}/>

            <CommonInput value={user.firstName} placeholder={'Username'} name={'Firstname'}
                         onChange={e => setUser({...user, firstName: e.target.value})}
                         validate={text => validateName(text, user.lastName)}/>
            <CommonInput value={user.lastName} placeholder={'Username'} name={'Lastname'}
                         onChange={e => setUser({...user, lastName: e.target.value})}
                         validate={text => validateName(user.firstName, text)}/>
            <CommonInput value={user.email} placeholder={'Username'} name={'Email'}
                         onChange={e => setUser({...user, email: e.target.value})}
                         validate={text => validateEmail( text)}/>
            <CommonInput value={user.password} placeholder={'Username'} name={'Email'}
                         onChange={e => setUser({...user, password: e.target.value})}
                         validate={text => validatePassword( text)}/>
            <CommonInput value={user.repeatPassword || ''} placeholder={'Username'} name={'Email'}
                         onChange={e => setUser({...user, repeatPassword: e.target.value})}
                         validate={text => validateRepeatPassword( user.password, text)}/>
        </div>
    );
}


export default UserInputComponent;