import React, {MouseEventHandler, useRef, useState} from 'react'
import {Redirect} from 'react-router-dom'
import styles from "./css/signup.module.scss";
import rocketSvg from "../../img/rocket.svg";
import CommonInput from '../../component/common/CommonInput';
import {login, signup} from "../../service/auth.service";
import {User} from "../../model/User";
import {Toast} from "primereact/toast";

interface Props {

}

const Signup: React.FC<Props> = ({}) => {
    const toast = useRef<Toast>(null);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const handleSubmit: MouseEventHandler<HTMLElement> = async (event) => {
        event.preventDefault();
        // const user: User = {
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     password
        // }
        // await signup(user);
        // console.log('sign up successfully');
        //
        // console.log(toast);
        // @ts-ignore
        toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
        window.location.href = '/';
        // const userLoginResponseDto = await login(username, password);
        // setSignUpSuccess(true);
        // eslint-disable-next-line no-restricted-globals
        // history.pushState(null, '/login');
    }

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const validateUsername = (text: string): string => {
        return text.length < 6 ? 'Username must at least 6 chars' : '';
    }
    const validateName = (firstName: string, lastName: string) => {
        return (firstName + lastName).length < 3 ? 'Name must at least 3 chars' : '';
    }
    const validateEmail = (text: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(text).toLowerCase()) ? '' : 'Email is invalid';
    }
    const validatePassword = (text: string) => {
        // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
        // return re.test(text) ? '' : 'Password is invalid';
        // return text.length > 5 ? '' : 'Password is invalid';
    return ''
    }
    const validateRepeatPassword = (pass: string, repeat: string) => {
        return pass === repeat ? '' : 'Password does not match';
    }

    const inputValid = () => {
        return !validateUsername(username)
            && !validateEmail(email)
            && !validateName(firstName, lastName)
            && !validatePassword(password)
            && !validateRepeatPassword(password, repeatPassword)
    }

    return (
        <div className={styles.container}>
            <Toast ref={toast} />
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    <form action="/signup" name="signUpForm" method="POST" id="sign-up-form"
                          className={styles["sign-up-form"]}
                          autoComplete="asldfa">
                        <h2 className={styles.title}>Sign up</h2>
                        <CommonInput value={username} placeholder={'Username'}
                                     onChange={e => setUsername(e.target.value)}
                                     validate={text => validateUsername(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <CommonInput value={email} placeholder={'Email'}
                                     onChange={e => setEmail(e.target.value)}
                                     validate={text => validateEmail(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <CommonInput value={firstName} placeholder={'Firstname'}
                                     onChange={e => setFirstName(e.target.value)}
                                     validate={text => validateName(firstName, lastName)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <CommonInput value={lastName} placeholder={'Lastname'}
                                     onChange={e => setLastName(e.target.value)}
                                     validate={text => validateName(firstName, lastName)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <CommonInput value={password} placeholder={'Password'} type={'password'}
                                     onChange={e => setPassword(e.target.value)}
                                     validate={text => validatePassword(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <CommonInput value={repeatPassword} placeholder={'Password'} type={'password'}
                                     onChange={e => setRepeatPassword(e.target.value)}
                                     validate={text => validateRepeatPassword(password, text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-user"></i>*/}
                        {/*    <input type="text" placeholder="Username" name="username" id="signUpUsernameInput"*/}
                        {/*           autoComplete="none"/>*/}
                        {/*</div>*/}
                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-envelope"></i>*/}
                        {/*    <input type="email" placeholder="Email" name="email"/>*/}
                        {/*</div>*/}
                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-user"></i>*/}
                        {/*    <input type="text" placeholder="First name" name="firstName"/>*/}
                        {/*</div>*/}
                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-user"></i>*/}
                        {/*    <input type="text" placeholder="Last name" name="lastName"/>*/}
                        {/*</div>*/}
                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-lock"></i>*/}
                        {/*    <input type="password" placeholder="Password" name="password" id="signUpPasswordInput"/>*/}
                        {/*</div>*/}

                        {/*<div className={styles["input-field"]}>*/}
                        {/*    <i className="fas fa-lock"></i>*/}
                        {/*    <input type="password" placeholder="Confirm password" name="confirmPassword"/>*/}
                        {/*</div>*/}

                        <input type="submit" className={styles["btn"]} value="Sign up" disabled={!inputValid()}
                               onClick={handleSubmit}/>
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles["panels-container"]}>
                <div className={`${styles["panel"]} ${styles["left-panel"]}`}>
                    <div className={styles["content"]}>
                        <h1>Welcome</h1>
                        <p>
                            Don't have an account?<b/>Let's sign up and start learning!
                        </p>
                        <img src="" alt=""/>
                    </div>
                    <img src={rocketSvg} className={styles["image"]} alt=""/>
                </div>
            </div>
        </div>
    );
}


export default Signup;