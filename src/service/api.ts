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

export default axios;