export default interface Category {
    id: number;
    name: string;
    icon: string;
    subs: Category[]
}