import React from 'react'
import emptyImage from '../../../assets/img/empty-search.svg'

interface Props {
    message?: string;
    containerStyle?: React.CSSProperties | undefined
}


const EmptyListComponent: React.FC<Props> = ({message}) => {
    return (
        <div style={{
            height: '100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

        }}>
            <h1 style={{color: 'rgba(0,0,0,0.7)'}}>{message || "Emtpy list"}</h1>
            <img src={emptyImage} style={{height: '30%'}} alt=""/>
        </div>
    );
}


export default EmptyListComponent;