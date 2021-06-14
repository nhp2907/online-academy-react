export const getSearchQueryString = (dto: any) => {
    const keys = Object.keys(dto);
    let result = '';
    for (let k of keys) {
        if (k) {
            if (result.length === 0) {
                result += `?${k}=${dto[k]}`;
            } else {
                result += `&${k}=${dto[k]}`
            }
        }
    }

    return result;
}