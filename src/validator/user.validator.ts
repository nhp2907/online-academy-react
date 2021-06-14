import {User} from "../model/User";

export const validateUsername = (text: string): string => {
    return text.length < 6 ? 'Username must at least 6 chars' : '';
}
export const validateName = (firstName: string, lastName: string) => {
    return (firstName + lastName).length < 3 ? 'Name must at least 3 chars' : '';
}
export const validateEmail = (text: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(text).toLowerCase()) ? '' : 'Email is invalid';
}
export const validatePassword = (text: string) => {
    // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
    // return re.test(text) ? '' : 'Password is invalid';
    // return text.length > 5 ? '' : 'Password is invalid';
    return ''
}
export const validateRepeatPassword = (pass: string, repeat: string) => {
    return pass === repeat ? '' : 'Password does not match';
}

export const validate = (user: User): boolean => {
    return !validateUsername(user.username)
        && !validateEmail(user.email)
        && !validateName(user.firstName, user.lastName)
        && !validatePassword(user.password)
}