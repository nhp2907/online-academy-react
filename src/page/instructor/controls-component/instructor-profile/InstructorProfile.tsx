import React from 'react'
import {User} from "../../../../model/User";
import UserProfilePage from "../../../user-profile/UserProfilePage";
import UserProfileComponent from "../../../user-profile/component/UserProfileComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {Redirect} from 'react-router-dom';

interface Props {
}

const InstructorProfile: React.FC<Props> = ({}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return <Redirect to={{pathname: '/login', state: {backUrl: '/instructor/profile'}}}/>
    }
    return (
        <div style={{padding: 10}}>
            <UserProfileComponent user={user}/>
        </div>
    );
}


export default InstructorProfile;
