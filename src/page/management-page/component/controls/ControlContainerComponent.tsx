import React from 'react'

import styles from '../../management-page.module.scss'
import {RouteComponentProps} from "react-router";
import ControlComponentProps from "../../model/ControlComponentProps";

interface Props extends RouteComponentProps {
    title: string
    component?: React.FC<ControlComponentProps>
    render?: (props: ControlComponentProps | null) => React.ReactNode;
    controlComponentProps?: ControlComponentProps
}

const ControlContainerComponent: React.FC<Props> = ({title, render, controlComponentProps, component}) => {
    const ComP = component;
    return (
        <div className={styles.controlContainer}>
            <div className={styles.title}>
                <h1 className={styles.name}>{title}</h1>
            </div>
            <div className={styles.control}>
                {render ? render(controlComponentProps ?? null) :
                    ComP ? <ComP/> : ''
                }
            </div>
        </div>
    )
}
// class ControlContainerComponent extends React.Component<Props> {
//
//     ComP :React.FC<ControlComponentProps> | undefined = this.props.component;
//
//     render() {
//         return (
//             <div className={styles.controlContainer}>
//                 <div className={styles.title}>
//                     <h1 className={styles.name}>{this.props.title}</h1>
//                 </div>
//                 <div className={styles.control}>
//                     {this.props.render ? (this.props.controlComponentProps) :
//
//                     }
//                 </div>
//             </div>
//         )
//     }
//
// }

export default ControlContainerComponent;