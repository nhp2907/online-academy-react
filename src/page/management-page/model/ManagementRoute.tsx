import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
export default interface ManagementRoute {
    path: string;
    component: React.FC<any>
    icon:string;
    name: string,
    redirectUrl?: string,
    hidden?: boolean // is hide from the nav bar, navigate by code or other <Link />
}