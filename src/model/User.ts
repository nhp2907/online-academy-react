import UserRole from "./UserRole";
import {BaseModel} from "./BaseModel";

export interface User extends BaseModel {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword?: string;
    role?: UserRole
    roleId?: number
    image?: string
}