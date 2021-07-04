import {User} from "../model/User";
import api, {httpDelete, put} from './api'
import {getSearchQueryString} from "./search.utils";


export const findUserApi = async (): Promise<User []> => {
    const {data} = await api.get<User[]>('/api/admin/user');
    return data;
}

export const validateUser = async (body: any): Promise<any> => {
    const queryString = getSearchQueryString(body);
    const {data} = await api.get<any>(`/api/validate/user${queryString}`);
    return data;
}

export const updateUserApi = async (body: any): Promise<User> => {
    const {data} = await put<User>('/api/user', body);
    return data;
}

export const disableUserApi = async (id: any): Promise<any> => {
    return await httpDelete<any>(`/api/user/${id}`);
}