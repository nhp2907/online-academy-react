import {User} from "../model/User";
import {get, httpDelete, post, put} from "./api";
import Category from "../model/Category";
import {getSearchQueryString} from "./search.utils";


//region User
export const findUserApi = async (body: any): Promise<User[]> => {
    const queryString = getSearchQueryString(body);
    const {data} = await get<User[]>(`/api/admin/user${queryString}`);
    return data;
}

export const createUserApi = async (body: any): Promise<User> => {
    const {data} = await post<User>('/api/admin/user', body);
    return data;
}

export const updateUserApi = async (body: any): Promise<User> => {
    const {data} = await put<User>('/api/admin/user', body);
    return data;
}

export const deleteUserApi = async (id: any): Promise<any> => {
    const data = await httpDelete<User>(`/api/admin/user/${id}`);
    return data;
}
//endregion


//region Categories
export const findCategoriesApi = async (body: any) => {
    const queryString = getSearchQueryString(body);
    const {data} = await get<Category>(`/api/admin/category${queryString}`);
    return data;
}
export const createCategoryApi = async (body: Category) => {
    const {data} = await post<Category>('/api/admin/category', body);
    return data;
}

export const updateCategoryApi = async (body: Category) => {
    const {data} = await put<Category>('/api/admin/category', body);
    return data;
}

export const deleteCategoryApi = async (id: any) => {
    const {data} = await httpDelete<Category>(`/api/admin/category/${id}`);
    return data;
}
//endregion
