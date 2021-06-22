import {ProgressSpinner} from 'primereact/progressspinner';
import React from 'react'

interface Props {

}

const SpinnerComponent: React.FC<Props> = ({}) => {
    return (<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
        <ProgressSpinner animationDuration=".6s"/>
    </div>)
}


export default SpinnerComponent;