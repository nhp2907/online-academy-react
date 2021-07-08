import React, {MouseEventHandler, useRef} from 'react'
import {Button} from "primereact/button";
import {MenuItem} from "primereact/api";
import {Menu} from "primereact/menu";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from '../../../redux/auth/auth.slice';
import {useHistory} from 'react-router-dom';
import UserRole from "../../../model/UserRole";
import {RootState} from "../../../redux/store";
import {User} from "../../../model/User";

interface Props {

}

const ProfileComponent: React.FC<Props> = ({}) => {
    const user = useSelector((s: RootState) => s.auth.user);
    const history = useHistory();
    const dispatch = useDispatch();
    let items: MenuItem[] = [
        {
            label: 'Admin',
            roles: [UserRole.Admin],
            items: [{
                icon: 'pi pi-fw pi-key',
                label: 'Admin management',
                command: () => {
                    history.push('/admin');
                }
            }]
        },
        {
            label: 'Instructor',
            roles: [UserRole.Instructor],
            items: [{
                icon: 'pi pi-fw pi-briefcase',
                label: 'Instructor management',
                command: () => {
                    history.push('/instructor');
                }
            }]
        },
        {
            label: 'Account',
            roles: [],
            items: [
                {
                    icon: 'pi pi-fw pi-user',
                    label: 'View profile',
                    command: () => {
                        history.push('/profile');
                    }
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-fw pi-power-off',
                    command: () => {
                        dispatch(setAuth({token: null, user: null}))
                        localStorage.removeItem('token')
                    },
                    template: (item, options) => {
                        return (
                            /* custom element */
                            <a className={options.className} target={item.target} onClick={options.onClick}>
                                <span className={`${options.iconClassName}`} style={{color: "red"}}/>
                                <span className={options.labelClassName} style={{color: "red"}}>{item.label}</span>
                            </a>
                        );
                    }
                }
            ]
        }
    ]
    const menuRef = useRef(null);
    const getUserMenuItems = (user: User | null) => {
        return items.filter((item: MenuItem) => {
            // console.log(item.roles);
            return item.roles?.length === 0 || item.roles?.includes(user?.roleId)
            // return true;
        });
    }

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        menuRef.current.toggle(event)
    }
    return (
        <div>
            <Menu model={getUserMenuItems(user)} popup ref={menuRef} id="overlay_tmenu"/>
            <Button className={'p-button-rounded'} icon={'pi pi-user'} style={{color: 'rgba(255,255,255, 0.8)'}}
                    onClick={handleToggleMenu}/>
        </div>
    );
}


export default ProfileComponent;