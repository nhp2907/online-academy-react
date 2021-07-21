import * as React from 'react';
import {useLayoutEffect} from 'react';
import Nav from "../../component/nav/Nav";
import Profile from "../../component/profile/Profile";
import HomeComponent from "../../component/home/HomeComponent";
import styles from '../style.module.css'
import {useDispatch} from "react-redux";
import FbChat from "../../component/fb-chat/FbChat";

type Props = {};

export const HomePage = (props: Props) => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        onPageLoad().then(r => console.log(r));
    }, [])

    const onPageLoad = async () => {
        // const categories = await homeService.getCategories();
        // dispatch(setCategories(categories))
    }

    return (
        <div className={styles.page}>
            <Nav/>
            <HomeComponent/>
        </div>
    );
};