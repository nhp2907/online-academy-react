import React from 'react'
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import styles from "../nav.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

interface Props {
}

const NavRightSide: React.FC<Props> = ({}) => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div id={'right-side'} className={styles['right-side']}>
            {
                !user ? (<BeforeLogin/>) : (<AfterLogin/>)
            }
        </div>
    );
}

export default NavRightSide;