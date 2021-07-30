import React, {useEffect} from 'react'
import {User} from "../../../model/User";
import {NavLink, useHistory} from 'react-router-dom'
import styles from '../nav.module.scss'
import {Button} from "primereact/button";

interface Props {
    user?: User
}

const BeforeLogin: React.FC<Props> = ({user}) => {
    const history = useHistory();
    return (
        <div className={styles['before-sign-in']}>
            <div>
                <NavLink to={{pathname: '/login', state: {backUrl: history.location.pathname}}}>
                    <Button label="Log in" className={`p-button-text ${styles.loginButton}`}
                            style={{color: 'white', fontWeight: "bold", marginRight: 10}}/>
                </NavLink>
                <NavLink to={{pathname: '/signup', state: {backUrl: history.location.pathname}}}>
                    <Button label="Sign up" className="p-button-secondary  p-text-bold"
                            style={{fontWeight: 'bold'}}/>
                </NavLink>
            </div>
        </div>
    );
}


export default BeforeLogin;