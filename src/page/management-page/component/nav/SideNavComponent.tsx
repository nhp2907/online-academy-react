import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../../management-page.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import ManagementRoute from "../../model/ManagementRoute";

interface Props {
    list: ManagementRoute[]
}

const SideNavComponent: React.FC<Props> = ({list}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className={styles.sideNav}>
            <div className={styles.user}>
                <h1 className={styles.name}>{user?.firstName || '' + user?.lastName || ''}</h1>
            </div>
            <ul>
                {
                    list.map((route) => (
                        route.hidden ? '' :
                        <li key={route.path}>
                            <NavLink activeClassName={styles.active} to={route.path}>
                                {route.name}
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