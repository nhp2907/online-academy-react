import {User} from "../model/User";
import {findUserApi} from "../service/admin.service";
import {validateUser, validateUserEmailExceptId} from "../service/user.service";

export const validateUsername = async (text: string): Promise<string> => {
    if (!text || text.length < 3) {
        return 'Username must at least 6 chars';
    } else {
        const validateResult = await validateUser({username: text})
        if (!validateResult.isOk) {
            return `Username ${text} already taken`;
        } else {
            return ''
        }
    }
}
export const validateName = (firstName: string, lastName: string) => {
    return (firstName + lastName).length < 1 ? 'Name is required' : '';
}
export const validateEmail = async (text: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(text).toLowerCase())) {
        return 'Email pattern is invalid';
    } else {
        const validateResult = await validateUser({email: text})
        if (!validateResult.isOk) {
            return `Email ${text} already taken`;
        } else {
            return ''
        }
    }
}
export const validateEmailExceptId = async (text: string, id:any) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(text).toLowerCase())) {
        return 'Email pattern is invalid';
    } else {
        const validateResult = await validateUserEmailExceptId({email: text, id})
        if (!validateResult.isOk) {
            return `Email ${text} already taken`;
        } else {
            return ''
        }
    }
}
export const validatePassword = (text: string) => {
    // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
    // return re.test(text) ? '' : 'Password is invalid';
    return text.length >= 5 ? '' : 'Password format is invalid';
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