import React, {useEffect, useRef} from 'react';
import './App.css';
import {Provider, useSelector} from "react-redux";
import store, {persistor, RootState} from "./redux/store";
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
import {Toast, ToastMessageType} from "primereact/toast";
import SearchCourseResultPage from "./page/search-course-result-page/SearchCourseResultPage";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path={'/'} exact component={HomePage}/>
                            <Route path={'/login'} component={Login}/>
                            <Route path={'/signup'} component={Signup}/>
                            <Route path={'/course/:id'} exact component={CourseDetailPage}/>
                            <Route path={'/course'}  component={SearchCourseResultPage}/>
                        </Switch>
                    </Router>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
