import React from 'react'
import {User} from "../../../../model/User";
import UserProfilePage from "../../../user-profile/UserProfilePage";
import UserProfileComponent from "../../../user-profile/component/UserProfileComponent";

interface Props {
    user: User
}

const InstructorProfile : React.FC<Props> = ({user}) => {
    return (
        <div>
            <UserProfileComponent user={user} />
        </div>
    );
}


export default InstructorProfile;