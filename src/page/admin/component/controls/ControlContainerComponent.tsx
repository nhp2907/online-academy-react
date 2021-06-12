import React from 'react'

import styles from '../../admin-page.module.scss'
import {RouteComponentProps} from "react-router";

interface Props extends RouteComponentProps {
    title: string
    component?: React.FC<any>
    render: (props: { _?: React.ReactNode } | void) => React.ReactNode;
}

const ControlContainerComponent: React.FC<Props> = ({render}) => {
    return (
        <div className={styles.controlContainer}>
            <div className={styles.title}>
                <h1 className={styles.name}>{'props.title'}</h1>
            </div>
            <div>
                {render()}
            </div>
        </div>
    )
}

export default ControlContainerComponent;