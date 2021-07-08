import React, {MouseEventHandler, useRef, useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import styles from "./css/signup.module.scss";
import rocketSvg from "../../img/rocket.svg";
import CommonInput from '../../component/common/CommonInput';
import {Toast} from "primereact/toast";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from 'react-redux';
import {validateEmail, validateName, validatePassword, validateRepeatPassword, validateUsername} from '../../validator/user.validator';
import {signup} from '../../service/auth.service';
import {User} from '../../model/User';
import { setAuth } from '../../redux/auth/auth.slice';

interface Props {

}

const Signup: React.FC<Props> = ({}) => {
    const history = useHistory<{backUrl:string}>();
    const dispatch = useDispatch();
    const user = useSelector((s: RootState) => s.auth.user);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const handleSubmit: MouseEventHandler<HTMLElement> = async (event) => {
        event.preventDefault();
        const user: User = {
            firstName,
            lastName,
            username,
            email,
            password,
            watchList: []
        }
        try {
            const data =await signup(user);
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Successfully', detail: 'Sign up successfully'});
            // window.location.href = '/';
            dispatch(setAuth(data));
            // history.push('/');
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: "Login failed", detail: err?.response?.data.message || 'Something broken!'});
        }

    }

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [inputValid, setInputValid] = useState(false);

    const checkInputValid = async () => {
        const userNameValid = await validateUsername(username);
        const emailValid = await validateUsername(email);
        const isValid = !userNameValid
            && !emailValid
            && !validateName(firstName, lastName)
            && !validatePassword(password)
            && !validateRepeatPassword(password, repeatPassword)
        console.log(isValid);
        setInputValid(isValid);
    }
    if (user) {
        return <Redirect to={history.location.state.backUrl || '/'}/>
    }
    return (
        <div className={styles.container}>
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    <form action="/signup" name="signUpForm" method="POST" id="sign-up-form"
                          className={styles["sign-up-form"]}
                          autoComplete="asldfa">
                        <h2 className={styles.title}>Sign up</h2>
                        <CommonInput value={username} placeholder={'Username'} autoFocus
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
                                     validate={text => validateName(firstName, text)}
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
                        {/*    <i className="fas fa-lock"></i>*/}
                        {/*    <input type="password" placeholder="Confirm password" name="confirmPassword"/>*/}
                        {/*</div>*/}

                        <input type="submit" className={styles["btn"]} value="Sign up" disabled={inputValid}
                               onClick={handleSubmit}/>
                        <p className={styles['social-text']} style={{textAlign: 'center'}}>Or Sign up with social
                            platforms</p>
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
                            Already have an account?<b/>Let's login and start learning!
                        </p>

                        <Link to={'/login'}>
                            <button className={`${styles["btn"]} ${styles["transparent"]}`} id="sign-up-btn">
                                Login
                            </button>
                        </Link>
                        <img src="" alt=""/>
                    </div>
                    <img src={rocketSvg} className={styles["image"]} alt=""/>
                </div>
            </div>
        </div>
    );
}


export default Signup;