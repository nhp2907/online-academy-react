import * as React from 'react';
import Nav from "../../component/nav/Nav";
import Profile from "../../component/profile/Profile";
import HomeComponent from "../../component/home/HomeComponent";

import styles from './style.module.css'

type Props = {};

export const HomePage = (props: Props) => {
    return (
        <div className={styles.page}>
            <Nav/>
            <HomeComponent />
            <Profile/>
        </div>
    );
};