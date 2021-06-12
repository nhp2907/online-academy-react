import React, {useEffect} from 'react'
import {User} from "../../../model/User";
import {NavLink} from 'react-router-dom'
import styles from '../nav.module.scss'
import {Button} from "primereact/button";

interface Props {
    user?: User
}

const BeforeLogin: React.FC<Props> = ({user}) => {
    useEffect(() => console.log(styles))
    return (
        <div className={styles['before-sign-in']}>
            <div>
                <NavLink to={'/login'}>
                    <Button label="Log in" className="p-button-text"
                            style={{color: 'white', fontWeight: "bold", marginRight: 10}}/>
                </NavLink>
                <NavLink to={'/signup'}>
                    <Button label="Sign up" className="p-button-secondary  p-text-bold"
                            style={{fontWeight: 'bold'}}/>
                </NavLink>
            </div>
        </div>
    );
}


export default BeforeLogin;