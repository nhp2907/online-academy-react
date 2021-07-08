import React, {MouseEvent, useEffect, useRef, useState} from 'react'
import styles from './css/login.module.scss'
import rocketSvg from '../../img/rocket.svg'
import {Link, Redirect, useHistory, RouteComponentProps, withRouter} from "react-router-dom";
import {login} from '../../service/auth.service'
import CommonInput from "../../component/common/CommonInput";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from '../../redux/auth/auth.slice'
import {AppDispatch, RootState} from "../../redux/store";
import {Toast} from 'primereact/toast';

interface State {
    backUrl?: string
}

interface Props extends RouteComponentProps<{}, {}, State> {

}

const Login: React.FC<Props> = (props) => {
    useEffect(() => {
        console.log(props)
    }, [])
    const history = useHistory<State>();
    const user = useSelector((s: RootState) => s.auth.user);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const toast = useRef<Toast>(null);
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
            dispatch(setAuth(data));
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Successfully', detail: 'Login successfully'});
        } catch (err: any) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: "Login failed", detail: err?.response?.data.message || 'Something broken!'});
            console.log(err.constructor.name);
        }
    }

    if (user) {
        return <Redirect to={history.location.state?.backUrl || '/'}/>
    }

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    <form action="" method="POST" id="sign-in-form" className={styles["sign-in-form"]}>
                        <h2 className={styles.title}>Sign in</h2>
                        <CommonInput value={username} placeholder={'Username'} autoFocus
                                     onChange={e => setUsername(e.target.value)}
                                     validate={text => validateUsername(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>

                        <CommonInput value={password} placeholder={'Password'} type={'password'}
                                     onChange={e => setPassword(e.target.value)}
                                     validate={text => validatePassword(text)}
                                     containerClassName={styles['input-field-container']}
                                     errorMessageClassName={styles['error']}
                                     inputContainerClassName={styles["input-field"]}/>
                        <input type="submit" value="Login" className={`${styles["btn"]} ${styles["solid"]}`}
                               onClick={handleLogin}/>
                        <p className={styles["social-text"]} style={{textAlign: 'center'}}>Or Sign in with social platforms</p>
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