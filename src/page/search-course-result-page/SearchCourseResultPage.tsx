import React, {RefObject, useLayoutEffect, useRef} from 'react'
import Nav from "../../component/nav/Nav";
import {useDispatch} from "react-redux";
import * as homeService from "../../service/home.service";
import {setCategories} from "../../redux/categories/categorySlice";
import {Toast, ToastMessageType} from "primereact/toast";
import styles from "../style.module.css";
import {setShowMessage} from "../../redux/home/homeSlice";
import SearchResultMainComponent from "./compnent/SearchResultMainComponent";

interface Props {

}

const SearchCourseResultPage : React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        onPageLoad().then(r => console.log(r));
    })

    const onPageLoad = async () => {
        const categories = await homeService.getCategories();
        dispatch(setCategories(categories))
    }

    const toastRef: RefObject<Toast> = useRef<Toast>(null);
    const showMessage = (message: ToastMessageType) => {
        console.log('toastRef', toastRef);
        if (toastRef && toastRef.current) {
            toastRef.current.show(message);
        }
    }

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
            <SearchResultMainComponent />
        </div>
    );
}


export default SearchCourseResultPage;