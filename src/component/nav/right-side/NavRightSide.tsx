import React from 'react'
import {User} from "../../../model/User";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import styles from "../nav.module.scss";

interface Props {
    user?: User
}

const NavRightSide: React.FC<Props> = ({user}) => {
    return (
        <div id={'right-side'} className={styles['right-side']}>
            {
                !user ? (<BeforeLogin/>) : (<AfterLogin/>)
            }
        </div>
    );
}

export default NavRightSide;