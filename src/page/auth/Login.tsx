import React, {useState} from 'react'
import styles from './css/login.module.scss'
import rocketSvg from '../../img/rocket.svg'
import {Link} from "react-router-dom";
import {login} from '../../service/auth.service'
interface Props {

}

const Login: React.FC<Props> = ({}) => {

    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        const data = await login(username, password);
    }

    return (
        <div className={styles.container}>
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    <form action="/signin" method="POST" id="sign-in-form" className={styles["sign-in-form"]}>
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" name="username"/>
                        </div>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password"/>
                        </div>
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