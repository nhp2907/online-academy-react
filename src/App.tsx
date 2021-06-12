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
import AdminPage from "./page/admin/AdminPage";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path={'/'} exact component={HomePage}/>
                            <Route path={'/login'} exact component={Login}/>
                            <Route path={'/signup'} exact component={Signup}/>
                            <Route path={'/course/:id'} exact component={CourseDetailPage}/>
                            <Route path={'/course'} exact component={SearchCourseResultPage}/>
                            <Route path={'/course'} exact component={SearchCourseResultPage}/>
                            <Route path={'/admin'}  component={AdminPage}/>
                        </Switch>
                    </Router>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
