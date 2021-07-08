import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store, {persistor} from "./redux/store";

import './assets/_override.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {PersistGate} from "redux-persist/integration/react";
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
