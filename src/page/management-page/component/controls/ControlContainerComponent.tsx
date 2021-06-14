import React from 'react'

import styles from '../../management-page.module.scss'
import {RouteComponentProps} from "react-router";

interface Props extends RouteComponentProps {
    title: string
    component?: React.FC<any>
    render: (props: { _?: React.ReactNode } | void) => React.ReactNode;
}

const ControlContainerComponent: React.FC<Props> = ({title, render}) => {
    return (
        <div className={styles.controlContainer}>
            <div className={styles.title}>
                <h1 className={styles.name}>{title}</h1>
            </div>
            <div className={styles.control}>
                {render()}
            </div>
        </div>
    )
}

export default ControlContainerComponent;