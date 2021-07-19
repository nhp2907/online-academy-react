import Category from "../model/Category";
import {findCategoriesApi} from "../service/admin.service";

export const validateName = async (cate: Category) => {
    if (cate.name?.length === 0) {
        return "Name is required"
    } else {
        const cates = await findCategoriesApi({name: cate.name, parentId: cate.parentId })
        if (cates.length > 0) {
            return `Category ${cate.name} is existed`;
        } else {
            return ''
        }
    }
}

export const validate = (cate: Category) => {
    return validateName(cate);
}

const courseValidator = {
    validateName,
    validate
}
export default courseValidator;