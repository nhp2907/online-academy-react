import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'

import {Badge} from "primereact/badge";
import ProfileComponent from "./ProfileComponent";

import styles from '../nav.module.scss'
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import Course from "../../../model/Course";
import {MenuItem} from 'primereact/api';
import WatchListItemComponent from "./WatchListItemComponent";
import {getTopCourse} from "../../../service/home.service";
import {RootState} from "../../../redux/store";
import {useSelector} from 'react-redux';
import useWindowDimensions from "../../../hook/userWindowDimensions";

interface Props {

}

const AfterLogin: React.FC<Props> = ({}) => {
    const {width} = useWindowDimensions();
    const {topCourses, latestCourses, mostEnrollCourses} = useSelector((state: RootState) => state.home);
    const [watchList, setWatchList] = useState([])
    useEffect(() => {
        loadData().then(r => {
        });
    })
    const loadData = async () => {
        const _course = await getTopCourse()
    }
    const menuRef = useRef(null);
    const watchListToMenuModels = ((courses: Course[]): MenuItem[] => {
        return courses.map((c: Course) => ({
            label: c.name,
            course: c,
            template: (item: MenuItem) => <WatchListItemComponent course={item.course}/>
        }))
    })

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        menuRef.current.toggle(event)
    }

    return (
        <div className={styles.afterLogin}>
            <div className={styles.myLearning}>
                <Menu model={watchListToMenuModels(topCourses)} popup ref={menuRef} id="overlay_tmenu"/>
                <Button className={'p-button-rounded p-button-danger'} label={width > 850 ? 'Watch list' : ''}
                        icon={'pi pi-heart'} style={{color: 'rgba(255,255,255,1)'}}
                        onClick={handleToggleMenu}/>
            </div>
            <div className={styles.buttons}>
                {/*<CartComponent />*/}
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