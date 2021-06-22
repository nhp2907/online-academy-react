import * as React from 'react';
import {RefObject, useLayoutEffect, useRef} from 'react';
import Nav from "../../component/nav/Nav";
import Profile from "../../component/profile/Profile";
import HomeComponent from "../../component/home/HomeComponent";
import * as homeService from '../../service/home.service'
import styles from '../style.module.css'
import {useDispatch} from "react-redux";
import {setCategories} from '../../redux/categories/categorySlice';
import {Toast, ToastMessageType} from "primereact/toast";
import {setShowMessage} from '../../redux/home/homeSlice';

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

    const toastRef: RefObject<Toast> = useRef<Toast>(null);

    return (
        <div className={styles.page}>
            <Toast ref={t => {
                dispatch(setShowMessage((message: ToastMessageType) => {
                    // @ts-ignore
                    t.show(message);
                }))
                return toastRef;
            }}/>
            <Nav/>
            <HomeComponent/>
            <Profile/>
        </div>
    );
};