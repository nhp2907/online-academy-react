import {User} from "../model/User";
import api, {httpDelete, post, put} from './api'

export const getAll = async (): Promise<User []> => {
    const {data} = await api.get<User[]>('/api/user');
    return data;
}

export const createUserApi = async (body: any): Promise<User> => {
    const {data} = await post<User>('/api/user', body);
    return data;
}

export const updateUserApi = async (body: any): Promise<User> => {
    const {data} = await put<User>('/api/user', body);
    return data;
}

export const disableUserApi = async (id: any): Promise<any> => {
    return await httpDelete<any>(`/api/user/${id}`);
}