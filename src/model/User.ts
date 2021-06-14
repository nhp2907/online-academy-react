import UserRole from "./UserRole";

export interface User {
    id: string;
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