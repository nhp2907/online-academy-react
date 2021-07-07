import React from 'react'
import styles from './buy-tab.module.scss'
import { Card } from 'primereact/card';
import {Button} from "primereact/button";

interface Props {
    course?: any
}

const BuyTabComponent : React.FC<Props> = ({course}) => {
    return (
        <div className={styles.buyTab}>
            <div className={styles.image}>
                <img src={course.image} alt=""/>
            </div>
            <div className={styles.introduce} >
                <h4>This course includes:</h4>
                <ul>
                    <li>13 hours on-demand video</li>
                    <li>Full lifetime access</li>
                    <li>Certificate of completion</li>
                </ul>
            </div>
            <div className={styles.priceAndBuy} >
                <small>on: </small>
                <span className={styles.priceNumber}>{`${course.price}`}</span>
                <span>USD</span>
                <div className={styles.buttons} >
                    <Button label={'Add to wish list'} className={'p-button-outlined p-button-success'}/>
                    <Button label={'Buy this course'} className={'p-button-danger'}/>
                </div>
            </div>
            <span>Online Academy</span>
        </div>
    );
}


export default BuyTabComponent;