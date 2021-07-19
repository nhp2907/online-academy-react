import React from 'react'
import SideNavComponent from "./component/nav/SideNavComponent";
import {Redirect, Route} from "react-router-dom";
import UserManagementComponent from "./component/controls/user-management/UserManagementComponent";
import styles from './admin-page.module.scss'
import CategoryManagementComponent from "./component/controls/category-management/CategoryManagementComponent";
import CourseManagementComponent from "./component/controls/course-management/CourseManagementComponent";
import ControlContainerComponent from "./component/controls/ControlContainerComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface Props {

}

const AdminPage: React.FC<Props> = ({}) => {
    const adminRouteList = [
        {
            path: '/admin/user',
            component: UserManagementComponent,
            icon: 'users',
            name: 'User management'
        },
        {
            path: '/admin/category',
            icon: 'users',
            name: 'Category management',
            component: CategoryManagementComponent,
        },
        {
            path: '/admin/course',
            icon: 'book',
            name: 'Course management',
            component: CourseManagementComponent,
        }
    ]

    const user = useSelector((state: RootState) => state.auth.user);
    if (!user || user.roleId !== 4) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={styles.main}>
            <SideNavComponent list={adminRouteList}/>
            <div className={styles.controlContainer}>

                <Route key={'admin'} path={'/admin'} exact component={UserManagementComponent}/>
                {
                    adminRouteList.map((l) =>
                        <Route key={l.path + l.name} path={l.path} exact
                               render={(props) => <ControlContainerComponent {...props} title={l.name}
                                                                             component={l.component}
                                                                             render={(p) => <l.component {...p}/>}/>}
                        />
                    )
                }
            </div>
        </div>
    );
}


export default AdminPage;