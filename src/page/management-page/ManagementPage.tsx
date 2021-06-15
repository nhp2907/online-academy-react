import React from 'react'
import {Redirect, Route, RouteComponentProps} from "react-router-dom";
import styles from './management-page.module.scss'
import SideNavComponent from './component/nav/SideNavComponent';
import ControlContainerComponent from './component/controls/ControlContainerComponent';
import ManagementRoute from "./model/ManagementRoute";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import UserRole from "../../model/UserRole";

interface Props extends RouteComponentProps {
    routes: ManagementRoute[],
    defaultRoute: ManagementRoute
    roles: UserRole[],
    redirectUrl: string;
}

const ManagementPage: React.FC<Props> = ({routes, defaultRoute, roles, redirectUrl}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user || !roles.find(s => s === user.roleId)) {
        return <Redirect to={redirectUrl}/>
    }
    const renderControlComponent = (props: any) => {

    }
    const renderRoute = (route: ManagementRoute) => {
        return <Route key={route.path + route.name} path={route.path} exact
                      render={(props) => <ControlContainerComponent  {...props} title={route.name}
                                                                     component={route.component}
                                                                     render={route.render}/>}
        />
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