import React from 'react'
import Category from "../../model/Category";
import SubCategoryComponent from "./SubCategoryComponent";

interface Props {
    item: Category
}

const CategoryComponent: React.FC<Props> = ({item}) => {
    return (
        <>
            <a href="#" className="sub-category-link">
                <i className="fas fa-long-arrow-alt-right"/>
                {item.name}
            </a>
            {item.subs.map((cate: Category) => <SubCategoryComponent item={cate}/>)}
        </>
    );
}


export default CategoryComponent;