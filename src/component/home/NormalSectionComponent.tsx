import React from 'react'
import CategoryList from "../categories/CategoryList";

import styles from '../../page/home/home.module.scss'
import SlideShowComponent from "./SlideShowComponent";

interface Props {

}

const NormalSectionComponent : React.FC<Props> = ({}) => {
    return (
        <div className={`${styles['categories-and-slideshow']}`}>
            <CategoryList />
            <SlideShowComponent />
        </div>
    );
}


export default NormalSectionComponent;