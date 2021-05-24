import React, {useEffect} from 'react'
import {User} from "../../../model/User";
import {NavLink} from 'react-router-dom'
import styles from '../nav.module.scss'

interface Props {
    user?: User
}

const BeforeLogin: React.FC<Props> = ({user}) => {
    useEffect(() => console.log(styles))
    return (
        <div className={styles['before-sign-in']}>
            <div className={styles['my-teach']}>
                <a href="#" className={styles['nav-link']}>Teach on Udemy</a>
                <div className={styles['my-teach-content']}>
                    <p>Turn what you know into an opportunity and reach millions around the world.</p>
                    <a href="#" className={`${styles['content-btn']} ${styles['nav-link']}`}>Learn More</a>
                </div>
            </div>
            <NavLink to={'/signup'}>
                <a href="auth" className={styles['nav-link']}>Sign Up</a>
            </NavLink>
            <NavLink to={'/login'}>
                <a href="auth" className={styles['nav-link']}>Sign In</a>
            </NavLink>
        </div>
    );
}


export default BeforeLogin;