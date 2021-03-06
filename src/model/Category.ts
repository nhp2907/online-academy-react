import {BaseModel} from "./BaseModel";

export default interface Category extends BaseModel{
    parentId?: string;
    id?: string;
    name: string;
    icon: string;
    level: number
    subs: Category[]
}