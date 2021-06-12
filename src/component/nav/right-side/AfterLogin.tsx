import React from 'react'

import {Badge} from "primereact/badge";
import ProfileComponent from "./ProfileComponent";

import styles from '../nav.module.scss'
import CartComponent from "./CartComponent";

interface Props {

}

const AfterLogin: React.FC<Props> = ({}) => {
    return (
        <div className={styles.afterLogin}>
            <div className="my-learning">
                <a href="#" className="nav-link">My learning</a>
                <div className="my-learning-dropdown-content">

                </div>
            </div>
            <div className={styles.buttons}>
                <CartComponent />
                <div className={styles.notify}>
                    <i className="pi pi-bell p-mr-4 p-text-secondary p-overlay-badge" style={{marginTop: 12}}>
                        <Badge className={'p-badge-danger'} value="2"></Badge></i>
                </div>
            <ProfileComponent/>
            </div>
        </div>
    );
}


export default AfterLogin;