import axios, {AxiosResponse} from 'axios'
import {getSearchQueryString} from "./search.utils";
import {currentEnv} from "../config/evironment";

const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.authorization = 'Bearer ' + token;
}
axios.defaults.baseURL = currentEnv.apiUrl

const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.authorization = 'Bearer ' + token;
}

function createAxiosResponseInterceptor() {
    const interceptor = axios.interceptors.response.use(
        response => response,
        error => {
            // Reject promise if usual error
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            /*
             * When response code is 401, try to refresh the token.
             * Eject the interceptor so it doesn't loop in case
             * token refresh causes the 401 response
             */
            axios.interceptors.response.eject(interceptor);
            console.log('lỗi 401')
            const rt = localStorage.getItem("refreshToken")
            const tk = localStorage.getItem("token")
            console.log('rt: ', rt);
            return axios.post('/api/auth/refresh', {
                accessToken: tk,
                refreshToken: rt
            }).then(response => {
                const {data: {accessToken}} = response;
                console.log(accessToken);
                saveToken(accessToken);
                console.log(error.config)
                error.config.headers.authorization = 'Bearer ' + accessToken
                return axios(error.config);
            }).catch(error => {
                // destroyToken();
                return Promise.reject(error);
            }).finally(createAxiosResponseInterceptor);
        }
    );
}

createAxiosResponseInterceptor();

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