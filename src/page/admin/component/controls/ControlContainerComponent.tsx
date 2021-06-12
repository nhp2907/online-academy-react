import React from 'react'

interface Props {
    title: string
    component: React.ComponentType<any>
}

const ControlContainerComponent: React.FC<Props> = ({title, component}) => {
    return (
        <div>
            <h1>{title}</h1>
            <div>
                {/*{component}*/}
            </div>
        </div>
    );
}


export default ControlContainerComponent;