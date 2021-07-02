import React from 'react'
import ControlComponentProps from "./ControlComponentProps";

export default interface ManagementRoute {
    path: string;
    component: React.FC<any>
    icon: string;
    name: string,
    redirectUrl?: string,
    hidden?: boolean // is hide from the nav bar, navigate by code or other <Link />
    render?: (props: ControlComponentProps | null) => React.ReactNode
    renderHeader?: (props:any) => React.ReactNode
}