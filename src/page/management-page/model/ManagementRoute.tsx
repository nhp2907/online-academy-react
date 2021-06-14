import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
export default interface ManagementRoute {
    path: string;
    component: React.FC<any>
    icon:string;
    name: string
}