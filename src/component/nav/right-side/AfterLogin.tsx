import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'

import {Badge} from "primereact/badge";
import ProfileComponent from "./ProfileComponent";

import styles from '../nav.module.scss'
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import Course from "../../../model/Course";
import {MenuItem, MenuItemCommandParams, MenuItemOptions} from 'primereact/api';
import WatchListItemComponent from "./watch-list-item/WatchListItemComponent";
import useWindowDimensions from "../../../hook/userWindowDimensions";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {getWatchListApi} from "../../../service/user.service";
import {useHistory} from 'react-router-dom';
import emptyImage from "../../../assets/img/empty-search.svg";

interface Props {

}

const AfterLogin: React.FC<Props> = ({}) => {
    const history = useHistory();
    const user = useSelector((state: RootState) => state.auth.user);
    const [watchList, setWatchList] = useState<Course[]>([])
    const {width} = useWindowDimensions();
    useEffect(() => {
        if (user) {
            getWatchListApi(user.id).then(r => setWatchList(r))
        }
    }, [user])

    const menuRef = useRef(null);

    const watchListToMenuModels = ((courses: Course[]): MenuItem[] => {
        if (courses.length > 0) {
            return courses.map((c: Course) => ({
                label: c.name,
                course: c,
                template: (item: MenuItem, options: MenuItemOptions) => <WatchListItemComponent
                    onClick={e => {
                        history.push(`/course/${c.id}`)
                        handleToggleMenu(e)
                    }}
                    course={item.course}/>,
                command: () => {
                    history.push(`/course/${c.id}`)
                }
            }))
        } else {
            return [{
                template: () => <div style={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column'
                }}>
                    <img src={emptyImage} style={{height: 50}} alt=""/>
                    <span>You have no course here!</span>
                </div>
            }]
        }
    })

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        menuRef.current.toggle(event)
    }

    return (
        <div className={styles.afterLogin}>
            <div className={`${styles.myLearning}`}>
                <Menu model={watchListToMenuModels(watchList)} popup ref={menuRef} id="overlay_tmenu-watch-list"
                      className={'watch-list-menu-container'}/>
                <Button className={'p-button-rounded p-button-danger'} label={width > 850 ? 'Watch list' : ''}
                        icon={'pi pi-heart'} style={{color: 'rgba(255,255,255,1)'}}
                        onClick={handleToggleMenu}/>
            </div>
            <div className={styles.buttons}>
                {/*<CartComponent />*/}
                <div className={styles.notify}>
                    <i className="pi pi-bell p-mr-4 p-text-secondary p-overlay-badge" style={{marginTop: 12}}>
                        <Badge className={'p-badge-danger'} value="2"/>
                    </i>
                </div>
                <ProfileComponent/>
            </div>
        </div>
    );
}


export default AfterLogin;