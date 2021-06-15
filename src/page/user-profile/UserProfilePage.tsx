import React from 'react'
import {TabPanel, TabView} from 'primereact/tabview';
import styles from './user-profile.module.scss'
import './tabview.scss'
import ProfileInfoComponent from "./component/profile-info/ProfileInfoComponent";
import ProfilePictureComponent from "./component/profile-picture/ProfilePictureComponent";
import {useSelector} from 'react-redux';
import {RootState} from "../../redux/store";
import ProfilePrivacyComponent from "./component/profile-privacy/ProfilePrivacyComponent";
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.svg'

interface Props {

}

const UserProfilePage: React.FC<Props> = ({}) => {
    const user = useSelector((s: RootState) => s.auth.user);
    return (
        <div className={styles.main}>
            <Link to={'/'}>
                <div className={styles.leftBar}>
                    <div>
                        <img
                            src={logo}/>
                        <span>Home</span>
                    </div>
                </div>
            </Link>
            <div className={styles.header}>
                <h1>Nugyen Hoang Phuc</h1>
                <span>profile</span>
            </div>
            <div className={styles.tabViewContainer}>
                <TabView activeIndex={1} className={'profile-tabview'}>
                    <TabPanel header="Profile info">
                        <ProfileInfoComponent user={user}/>
                    </TabPanel>
                    <TabPanel header="Profile picture">
                        <ProfilePictureComponent/>
                    </TabPanel>
                    <TabPanel header="Privacy">
                        <ProfilePrivacyComponent/>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}


export default UserProfilePage;