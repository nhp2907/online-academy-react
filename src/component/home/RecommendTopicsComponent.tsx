import React, {useEffect, useState} from 'react'
import styles from '../../page/home/home.module.scss'
import Course from "../../model/Course";
import {getTopMostRegisterCategories} from "../../service/home.service";
import Category from "../../model/Category";
import {useHistory} from 'react-router-dom';

interface Props {
}

const RecommendTopicsComponent: React.FC<Props> = ({}) => {
    const history = useHistory();
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        getTopMostRegisterCategories().then(r => setCategories(r))
    }, [])
    return (
        <div className={styles.recommendTopic}>
            <h3 className={styles.title}>Top most register Category</h3>
            <div className={styles.content}>
                {
                    categories.map((category: Category, index: number) => (
                        <div className={styles.cateItem}
                             onClick={e => {
                                 history.push(`course?category=${category.name}`)
                             }} key={index}>
                            <span>{category.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default RecommendTopicsComponent;