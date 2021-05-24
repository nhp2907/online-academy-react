import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from "./page/home/Home";
import Login from "./page/auth/Login";
import Signup from "./page/auth/Signup";

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path={'/'} exact component={Home}/>
                        <Route path={'/login'} exact component={Login}/>
                        <Route path={'/signup'} exact component={Signup}/>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
