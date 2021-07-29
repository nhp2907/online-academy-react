import * as React from 'react';
import {useLayoutEffect} from 'react';
import Nav from "../../component/nav/Nav";
import HomeComponent from "../../component/home/HomeComponent";
import styles from '../style.module.css'
import FbChat from "../../component/fb-chat/FbChat";
import Footer from '../../component/footer/Footer';

export const HomePage = ({}) => {
    useLayoutEffect(() => {
        onPageLoad().then(r => console.log(r));
    }, [])

    const onPageLoad = async () => {
    }

    return (
        <div className={styles.page}>
            <div>
                <Nav/>
                <HomeComponent/>
                <Footer />
            </div>
            <FbChat />
        </div>
    );
};