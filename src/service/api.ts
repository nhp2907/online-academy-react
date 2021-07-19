import axios, {AxiosResponse} from 'axios'
import {getSearchQueryString} from "./search.utils";
import {currentEnv} from "../config/evironment";

const token = localStorage.getItem("token");
if (token) {
    console.log('============== axios get token from local storage ===========')
    axios.defaults.headers.authorization = 'Bearer ' + token;
}
axios.defaults.baseURL = currentEnv.apiUrl

export function searchByCriteria<T>(url: string, searchDto: any): Promise<AxiosResponse<T>> {
    const queryString = getSearchQueryString(searchDto);
    console.log('queryString: ', queryString);
    return axios.get<T>(url + queryString);
}

export function get<T>(path: string): Promise<AxiosResponse<T>> {
    try {
        return axios.get<T>(path);
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export function post<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    try {
        return axios.post<T>(path, body);
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export async function postWithHeader<T>(path: string, body: any, headers?: any): Promise<T> {
    try {
        const {data} = await axios.post<T>(path, body, {
            headers
        });
        return data;
    } catch (err) {
        console.log('error at posst', err)
        throw new Error(err.response.data.message);
    }
}

export function put<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    try {
        return axios.put<T>(path, body);
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export function httpDelete<T>(path: string): Promise<AxiosResponse<T>> {
    try {
        return axios.delete<T>(path);
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export default axios;