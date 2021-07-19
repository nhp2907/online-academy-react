export const findIndexByIdUtil = (id: any, list: any[]) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

export const removeItemFromListByIdUtil = (id: any, list: any[]) => {
    const newList = [...list];
    const index = findIndexByIdUtil(id, list);
    newList.splice(index, 1);
    return newList;
}

export const replaceItemFromListByIdUtil = (item: any, list: any[]) => {
    const newList = [...list];
    const index = findIndexByIdUtil(item.id, list);
    newList.splice(index, 1, item);
    return newList;
}