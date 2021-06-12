import React from 'react'
import {Route} from "react-router-dom";
import styles from './management-page.module.scss'
import SideNavComponent from './component/nav/SideNavComponent';
import UserManagementComponent from './component/controls/user-management/UserManagementComponent';
import ControlContainerComponent from './component/controls/ControlContainerComponent';
import ManagementRoute from "./model/ManagementRoute";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface Props {
    routes: ManagementRoute[],
    defaultRoute: ManagementRoute
    roles: string[],
    redirectUrl: string;
}

const ManagementPage: React.FC<Props> = ({routes, defaultRoute, roles, redirectUrl}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    // if (!user || roles.find(s => s === user.role)) {
    //     return <Redirect to={redirectUrl}/>
    // }
    const renderRoute = (route: ManagementRoute) => {
        return <Route key={route.path + route.name} path={route.path} exact
                      render={(props) => <ControlContainerComponent {...props} title={route.name}
                                                                    render={(p) =>
                                                                        <route.component {...p}/>}/>}/>
    }
    return (
        <div className={styles.main}>
            <SideNavComponent list={routes}/>
            <div className={styles.controlContainer}>
                {renderRoute(defaultRoute)}
                {
                    routes.map((manageRoute: ManagementRoute) => renderRoute(manageRoute))
                }
            </div>
        </div>
    );
}


export default ManagementPage;