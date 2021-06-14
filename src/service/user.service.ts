import {User} from "../model/User";
import api from './api'

export const getAll = async (): Promise<User []> => {
    const {data} = await api.get<User[]>('/api/user');
    return data;
}