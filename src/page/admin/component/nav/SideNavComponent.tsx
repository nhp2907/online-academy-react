import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../../admin-page.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

interface Props {
    list: any[]
}

const SideNavComponent: React.FC<Props> = ({list}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className={styles.sideNav}>
            <div className={styles.user}>
                <span className={styles.name}>{user?.firstName || '' + user?.lastName || ''}</span>
            </div>
            <ul>
                {
                    list.map((l) => (
                        <li>
                            <NavLink activeClassName={styles.active} to={l.path}>
                                {l.name}
                            </NavLink>
                        </li>))
                }
                <li>
                    <a href="">Logout</a>
                </li>
            </ul>

        </div>
    );
}


export default SideNavComponent;