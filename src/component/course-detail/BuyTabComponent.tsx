import React from 'react'
import styles from './course-detail.module.scss'
import { Card } from 'primereact/card';

interface Props {

}

const BuyTabComponent : React.FC<Props> = ({}) => {
    return (
        <Card className={styles.buyTab}>
            <h1>BuyTabComponent works</h1>
        </Card>
    );
}


export default BuyTabComponent;