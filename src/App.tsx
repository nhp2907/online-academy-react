import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "./page/auth/Login";
import Signup from "./page/auth/Signup";

import './assets/_override.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

import {HomePage} from "./page/home/HomePage";
import CourseDetailPage from "./page/course-detail/CourseDetailPage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path={'/'} exact component={HomePage}/>
                        <Route path={'/login'}  component={Login}/>
                        <Route path={'/signup'}  component={Signup}/>
                        <Route path={'/course/:id'} exact component={CourseDetailPage}/>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
