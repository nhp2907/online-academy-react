import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom'
import Course from "../../../model/Course";

import styles from './course.module.scss'
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import { addCourse } from '../../../redux/cart/cartSlice';
import { setToastMessage } from '../../../redux/home/homeSlice';
import {Toast} from "primereact/toast";
import {RootState} from "../../../redux/store";

interface Props {
    item: Course
}

const CourseComponent: React.FC<Props> = ({item}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const toastRef = useRef<Toast>(null);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    return (
        <div className={styles.course} onClick={(event) => {
            history.push(`/course/${item.id}`)
        }}>
            <Toast ref={toastRef} />
            <div className={styles.image}>
                <img style={{backgroundColor: "gray"}} src={item.image} alt=""/>
            </div>
            <div className={styles.info}>
                <h3>{item.name}</h3>
                <span className={styles.author}>{item.author}</span>
                <div className={styles.rating}>
                    <span className={styles.number}>{item.rating}</span>
                    <div className={styles.startRating}>{"abc"}</div>
                    <span className={styles.numberOfRate}>{item.numReview}</span>
                </div>
            </div>
            <div className={styles.priceAndBuy}>
                <div>
                    <span>{item.price}</span>
                    <span>{item.prePrice}</span>
                </div>
                <Button iconPos={"right"} icon={'pi pi-plus'} label={'Add'} className={'p-button-danger'}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addCourse(item))
                    // @ts-ignore
                    showToastMessage({severity: 'success', summary: 'Add course successfully!', detail: 'Course is added to your cart!',});
                }}/>
            </div>
        </div>
    );
}


export default CourseComponent;