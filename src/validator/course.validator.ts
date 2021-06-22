import Course from "../model/Course";

export const validateName = (name: string) => {
    return name?.length === 0 ? "Name is required" : '';
}

export const validateHeadline = (headline: string) => {
    return headline?.length === 0 ? "Headline is required" : '';
}

export const validateDescription = (description: string) => {
    return !description || description === "<p><br></p>" ? "Description is required" : '';
}

export const validatePrice = (headline: number) => {
    return headline <= 0 ? "Price must be positive" : '';
}

export const validate = (course: Course) => {
    return validateName(course.name)
        && validateHeadline(course.headline)
        && validatePrice(course.price)
        && validateDescription(course.description);
}
const courseValidator = {
    validateName,
    validatePrice,
    validateHeadline,
    validateDescription,
    validate
}
export default courseValidator;