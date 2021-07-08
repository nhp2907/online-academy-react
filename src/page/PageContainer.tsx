import React, {RefObject, useEffect, useRef} from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";

import '../assets/_override.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {HomePage} from "./home/HomePage";
import CourseDetailPage from "./course-detail/CourseDetailPage";
import SearchCourseResultPage from "./search-course-result-page/SearchCourseResultPage";
import ManagementPage from "./management-page/ManagementPage";
import {adminDefaultRoute, adminRouteList, instructorDefaultRoute, instructorRouteList} from "../config/managementRouteConfig";
import UserRole from "../model/UserRole";
import UserProfilePage from "../page/user-profile/UserProfilePage";
import {setShowMessage} from "../redux/home/homeSlice";
import {Toast, ToastMessageType} from 'primereact/toast';
import {useDispatch, useSelector} from 'react-redux';

import './override.scss'
import {RootState} from "../redux/store";
import {getUserProfile} from "../service/user.service";
import {User} from "../model/User";
import {setUser} from '../redux/auth/auth.slice';

function PageContainer() {
    const toastRef: RefObject<Toast> = useRef<Toast>(null);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        if (token) {
            getUserProfile().then((user: User) => dispatch(setUser(user)))
        }
    }, [token])
    return (
        <div className="page-container">
            <Toast ref={t => {
                dispatch(setShowMessage((message: ToastMessageType) => {
                    // @ts-ignore
                    t.show(message);
                }))
                return toastRef;
            }}/>
            <Router>
                <Switch>
                    <Route path={'/'} exact component={HomePage}/>
                    <Route path={'/login'} exact component={Login}/>
                    <Route path={'/signup'} exact component={Signup}/>
                    <Route path={'/course/:id'} exact component={CourseDetailPage}/>
                    <Route path={'/course'} exact component={SearchCourseResultPage}/>
                    <Route path={'/course'} exact component={SearchCourseResultPage}/>
                    {/*<Route path={'/admin'}  component={AdminPage}/>*/}
                    <Route path={'/admin'}
                           render={(p) => <ManagementPage {...p} defaultRoute={adminDefaultRoute}
                                                          routes={adminRouteList} roles={[UserRole.Admin]}
                                                          redirectUrl={'/'}/>}
                    />
                    <Route path={'/instructor'}
                           render={(p) => <ManagementPage {...p} defaultRoute={instructorDefaultRoute}
                                                          routes={instructorRouteList}
                                                          roles={[UserRole.Instructor]}
                                                          redirectUrl={'/'}/>}
                    />
                    <Route path={'/profile'} exact component={UserProfilePage}/>
                </Switch>
            </Router>
        </div>
    );
}

export default PageContainer;
