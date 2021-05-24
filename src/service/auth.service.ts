import {User} from "../model/User";
import axios from 'axios';
import UserLoginResponseDto from "../dto/UserLoginResponseDto";
import api from './api'
import {useDispatch} from "react-redux";

export const signup = async (user: User): Promise<User> => {
    console.log(user)
    const {data} = await api.post<User>('/api/auth/signup', user);
    console.log(data);
    return data;
}

export const login = async (username: string, password: string): Promise<UserLoginResponseDto> => {
    const {data} = await api.post('/api/auth/login', {username, password});

    return data;
}
