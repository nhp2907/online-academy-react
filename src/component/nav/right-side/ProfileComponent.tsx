import React, {MouseEventHandler, useRef} from 'react'
import {Button} from "primereact/button";
import {MenuItem} from "primereact/api";
import {Menu} from "primereact/menu";
import {useDispatch} from "react-redux";
import {setAuth} from '../../../redux/auth/auth.slice';
import {useHistory} from 'react-router-dom';

interface Props {

}

const ProfileComponent: React.FC<Props> = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    let items: MenuItem[] = [
        // {
        //     label: 'Options',
        //     items: [{
        //         icon: 'pi pi-fw pi-user',
        //         label: 'View profile',
        //         command: () => {
        //             history.push('/profile');
        //         }
        //     },
        //         {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}]
        // },
        {
            label: 'Account',
            items: [{
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
                    },
                    template: (item, options) => {
                        console.log('item', item)
                        console.log('item', options)
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

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        menuRef.current.toggle(event)
    }
    return (
        <div>
            <Menu model={items} popup ref={menuRef} id="overlay_tmenu"/>
            <Button className={'p-button-rounded'} icon={'pi pi-user'} style={{color: 'rgba(255,255,255, 0.8)'}}
                    onClick={handleToggleMenu}/>
        </div>
    );
}


export default ProfileComponent;