import React, {MouseEventHandler, useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import styles from '../../page/home/home.module.scss'

import {TieredMenu} from 'primereact/tieredmenu';
import {MenuItem, MenuItemCommandParams} from "primereact/api";
import {Button} from "primereact/button";
import Category from "../../model/Category";
import {useHistory} from 'react-router-dom';

interface Props {

}

const CategoryList: React.FC<Props> = ({}) => {
    const history = useHistory();
    const categoriesRef = useRef(null);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        console.log('categoryItemsPromise', categoryItemsPromise);
        Promise.all(categoryItemsPromise).then(res => {
            // setCategories(res)
            setCategoryItems(res);
            console.log('categoriesItem: ', res);
        })
    }, [])

    const mapCateToItemDisplay = async (cate: Category) => {
        const item: MenuItem = {
            label: cate.name,
            icon: cate.icon,
            name: cate.name,
            command: categoryItemCommand
        }
        if (cate.subs) {
            const subItems = await Promise.all(cate.subs.map((sub: Category) => mapCateToItemDisplay(sub)));
            if (subItems && subItems.length > 0) {
                item.items = subItems;
            }
        }
        return item;
    }

    const categoryItemsPromise: Promise<MenuItem>[] = useSelector((state: RootState) =>
        state.categories.list.map((cate: Category) => mapCateToItemDisplay(cate)));

    function categoryItemCommand (e: MenuItemCommandParams) {
        history.push(`/course?category=${e.item.name}`)
    }

    const sampleItems: MenuItem[] = [
        {
            name: '',
            label: 'File',
            icon: 'pi pi-fw pi-file',
            command: categoryItemCommand,
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },
                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            separator: true
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const handleToggleMenu: MouseEventHandler<HTMLElement> = (event) => {
        // @ts-ignore
        categoriesRef.current.toggle(event)
    }

    return (
        <div className={styles['categories']}>
            <TieredMenu model={categoryItems} popup ref={categoriesRef} id="overlay_tmenu"/>
            <Button label="Categories" icon="pi pi-angle-down" iconPos={"right"} onClick={handleToggleMenu}
                    aria-haspopup
                    aria-controls="overlay_tmenu"/>
        </div>
    );
}


export default CategoryList;