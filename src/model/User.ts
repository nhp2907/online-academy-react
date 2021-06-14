export interface User {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string
    roleId?: number
    image?: string
}