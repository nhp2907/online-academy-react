import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react'
import {User} from "../../../model/User";
import ProfileInfoComponent from "./profile-info/ProfileInfoComponent";
import ProfilePictureComponent from "./profile-picture/ProfilePictureComponent";
import ProfilePrivacyComponent from "./profile-privacy/ProfilePrivacyComponent";
import UserRole from "../../../model/UserRole";
import InstructorInfoComponent from './instructor-info/InstructorInfoComponent';

interface Props {
    user: User | null
}

const UserProfileComponent: React.FC<Props> = ({user}) => {
    return (
        <div className={'userProfileComponent'}>
            <TabView activeIndex={1} className={'profile-tabview'}>
                <TabPanel header="Profile info">
                    <ProfileInfoComponent user={user}/>
                </TabPanel>
                <TabPanel header="Profile picture">
                    <ProfilePictureComponent/>
                </TabPanel>
                {/*{*/}
                {/*    user && user.roleId === UserRole.Instructor ?*/}
                {/*        <TabPanel header="Profile picture">*/}
                {/*            <InstructorInfoComponent />*/}
                {/*        </TabPanel> : ''*/}
                {/*}*/}
                <TabPanel header="Privacy">
                    <ProfilePrivacyComponent/>
                </TabPanel>
            </TabView>
        </div>
    );
}


export default UserProfileComponent;