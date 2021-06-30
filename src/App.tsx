import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store, {persistor} from "./redux/store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "./page/auth/Login";
import Signup from "./page/auth/Signup";

import './assets/_override.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {HomePage} from "./page/home/HomePage";
import CourseDetailPage from "./page/course-detail/CourseDetailPage";
import {PersistGate} from "redux-persist/integration/react";
import SearchCourseResultPage from "./page/search-course-result-page/SearchCourseResultPage";
import ManagementPage from "./page/management-page/ManagementPage";
import {
    adminDefaultRoute,
    adminRouteList,
    instructorDefaultRoute,
    instructorRouteList
} from "./config/managementRouteConfig";
import UserRole from "./model/UserRole";
import UserProfilePage from "./page/user-profile/UserProfilePage";
import PageContainer from "./page/PageContainer";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <div className="App">
                    <PageContainer />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
