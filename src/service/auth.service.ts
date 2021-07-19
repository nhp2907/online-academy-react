import {User} from "../model/User";
import UserLoginResponseDto from "../dto/UserLoginResponseDto";
import api from './api'

export const signup = async (user: User): Promise<UserLoginResponseDto> => {
    console.log(user)
    const {data} = await api.post<UserLoginResponseDto>('/api/auth/signup', user);
    console.log(data);
    return data;
}

export const login = async (username: string, password: string): Promise<UserLoginResponseDto> => {
    const {data} = await api.post<UserLoginResponseDto>('/api/auth/login', {username, password});
    return data;
}
