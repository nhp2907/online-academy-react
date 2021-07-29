import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import styles from '../../page/home/home.module.scss'

import {TieredMenu} from 'primereact/tieredmenu';
import {MenuItem, MenuItemCommandParams} from "primereact/api";
import {Button} from "primereact/button";
import Category from "../../model/Category";
import {useHistory} from 'react-router-dom';
import {getCategories} from "../../service/home.service";
import {setCategories} from '../../redux/categories/categorySlice';

interface Props {

}

const CategoryList: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoriesRef = useRef(null);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        getCategories().then(cates => {
            const categoriesItems = cates.map(c => mapCateToItemDisplay(c));
            dispatch(setCategories(cates))
            setCategoryItems(categoriesItems);
        })
        Promise.all(categoryItemsPromise).then(res => {
            setCategoryItems(res);
        })
    }, [])

    const mapCateToItemDisplay = (cate: Category) : MenuItem => {
        const item: MenuItem = {
            id: cate.id,
            label: cate.name,
            icon: cate.icon,
            name: cate.name,
            command: categoryItemCommand
        }
        if (cate.subs) {
            const subItems = (cate.subs.map((sub: Category) => mapCateToItemDisplay(sub)));
            if (subItems && subItems.length > 0) {
                item.items = subItems;
            }
        }
        return item;
    }

    const categoryItemsPromise: MenuItem[] = useSelector((state: RootState) =>
        state.categories.list.map((cate: Category) => mapCateToItemDisplay(cate)));

    function categoryItemCommand(e: MenuItemCommandParams) {
        history.push(`/course?category=${e.item.name}&categoryId=${e.item.id}`)
    }

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        categoriesRef.current.toggle(event)
    }

    return (
        <div className={styles['categories']}>
            <TieredMenu model={categoryItems} popup ref={categoriesRef} id="overlay_tmenu"/>
            <Button label="Categories" icon="pi pi-angle-down" iconPos={"right"} onClick={handleToggleMenu}
                    className={'p-button-text categories-button'} style={{color: 'white'}}
                    aria-haspopup
                    aria-controls="overlay_tmenu"/>
        </div>
    );
}


export default CategoryList;