import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import styles from '../../management-page.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import ManagementRoute from "../../model/ManagementRoute";
import {setAuth} from "../../../../redux/auth/auth.slice";
import {confirmDialog} from 'primereact/confirmdialog';
import logo from "../../../../assets/img/logo.svg";

interface Props {
    list: ManagementRoute[]
}

const SideNavComponent: React.FC<Props> = ({list}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const confirmLogout = () => {
        confirmDialog({
            message: 'Are you sure you want to logout?',
            header: 'Logout!',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                dispatch(setAuth({token: null, user: null}))
            },
            reject: () => {
            }
        });
    };

    return (
        <div className={styles.sideNav}>
            <div className={styles.user}>
                <Link to={'/'}>
                    <img src={logo} alt=""/>
                </Link>
                <h1 className={styles.name}>{`${user?.firstName} ${user?.lastName}`}</h1>
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
                    <a onClick={(event: any) => confirmLogout()}>Logout</a>
                </li>
            </ul>

        </div>
    );
}


export default SideNavComponent;