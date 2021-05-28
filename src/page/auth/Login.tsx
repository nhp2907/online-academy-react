import React, {MouseEvent, useState} from 'react'
import styles from './css/login.module.scss'
import rocketSvg from '../../img/rocket.svg'
import {Link} from "react-router-dom";
import {login} from '../../service/auth.service'
import CommonInput from "../../component/common/CommonInput";
import {useDispatch} from "react-redux";
import {setAuth} from '../../redux/auth/auth.slice'
import {AppDispatch} from "../../redux/store";

interface Props {

}

const Login: React.FC<Props> = ({}) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const validateUsername = (text: string): string => {
        return text.length < 3 ? 'Enter username' : '';
    }

    const validatePassword = (text: string): string => {
        return text.length < 3 ? 'Enter password' : '';
    }

    const handleLogin = async (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            console.log('login data: ', data);
            dispatch(setAuth(data));

            window.location.href = '/'
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    <form action="" method="POST" id="sign-in-form" className={styles["sign-in-form"]}>
                        <h2 className={styles.title}>Sign in</h2>
                        <CommonInput value={username} placeholder={'Username'}
                                     onChange={e => setUsername(e.target.value)}
                                     validate={text => validateUsername(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>

                        <CommonInput value={password} placeholder={'Username'}
                                     onChange={e => setPassword(e.target.value)}
                                     validate={text => validatePassword(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <input type="submit" value="Login" className={`${styles["btn"]} ${styles["solid"]}`}
                               onClick={handleLogin}/>
                        <p className={styles["social-text"]}>Or Sign in with social platforms</p>
                        <div className={styles["social-text"]}>
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
                        <Link to={'/signup'}>
                            <button className={`${styles["btn"]} ${styles["transparent"]}`} id="sign-up-btn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                    <img src={rocketSvg} className={styles["image"]} alt=""/>
                </div>
            </div>
        </div>
    );
}


export default Login;