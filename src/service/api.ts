import axios, {AxiosResponse} from 'axios'
import {getSearchQueryString} from "./search.utils";

const token = localStorage.getItem("token");
axios.defaults.headers.authorization = 'Bearer ' + token;
axios.defaults.baseURL = 'http://localhost:4000'

export function searchByCriteria<T>(url: string, searchDto: any): Promise<AxiosResponse<T>> {
    const queryString = getSearchQueryString(searchDto);
    console.log('queryString: ', queryString);
    return axios.get<T>(url + queryString);
}

export function get<T>(path: string): Promise<AxiosResponse<T>> {
    try {
        return axios.get<T>(path);
    } catch (err) {
        throw new Error(err.response.data);
    }
}

export function post<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    try {
        return axios.post<T>(path, body);
    } catch (err) {
        throw new Error(err.response.data);
    }
}

export function put<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    try {
        return axios.put<T>(path, body);
    } catch (err) {
        throw new Error(err.response.data);
    }
}

export function httpDelete<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    try {
        return axios.delete<T>(path, body);
    } catch (err) {
        throw new Error(err.response.data);
    }
}

export default axios;