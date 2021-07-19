import React from 'react'
import Category from "../../model/Category";

interface Props {
    item: Category
}

const SubCategoryComponent : React.FC<Props> = ({item}) => {
    return (
        <a href="#" className="sub-category-link"><i
            className="fas fa-long-arrow-alt-right"></i>{item.name}</a>
    );
}


export default SubCategoryComponent;