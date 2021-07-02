import {User} from "../model/User";
import {httpDelete, post, put} from "./api";


export const createUserApi = async (body: any): Promise<User> => {
    const {data} = await post<User>('/api/admin/user', body);
    return data;
}

export const updateUserApi = async (body: any): Promise<User> => {
    const {data} = await put<User>('/api/admin/user', body);
    return data;
}

export const disableUserApi = async (id: any): Promise<any> => {
    return await httpDelete<any>(`/api/admin/user/${id}`);
}