import React from 'react'
import Course from "../../../model/Course";

interface Props {
    item: Course
}

const CartListItem : React.FC<Props> = ({item}) => {
    return (
        <div>
            <h1>{item.name}</h1>
        </div>
    );
}


export default CartListItem;