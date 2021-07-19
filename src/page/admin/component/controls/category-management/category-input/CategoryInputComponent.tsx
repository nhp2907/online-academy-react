import React, {useEffect, useState} from 'react'
import {Button} from 'primereact/button';
import styles from './cate-input.module.scss'
import Category from "../../../../../../model/Category";
import CommonInput from '../../../../../../component/common/CommonInput';
import CommonSelect, {SelectItem} from '../../../../../../component/common/CommonSelect';
import {validateName} from '../../../../../../validator/category.validator';
import {getCategories} from "../../../../../../service/home.service";
import CommonSelectPrime from "../../../../../../component/common/CommonSelectPrime";

interface Props {
    category: Category
    onSubmit: (cate: Category) => void
    hideModal?: () => void
}

const CategoryInputComponent: React.FC<Props> = ({category, onSubmit, hideModal}) => {
    const [formCate, setFormCate] = useState<Category>(category);

    const [categoriesLv1, setCategoryLv1] = useState<SelectItem[]>([])

    useEffect(() => {
        console.log('category', category);
    }, [category])

    useEffect(() => {
        getCategories().then(r => {
            const mapCates = r.map(r => ({label: r.name, value: r.id}))
            setCategoryLv1([{label: 'None', value: ''}, ...mapCates])
        })
    }, [])

    // useEffect(() => {
    //     setFormCate(category);
    // }, [category])

    const style = {marginBottom: 15}
    return (
        <div className={styles.userInput}>
            <div style={style}>
                <CommonInput value={formCate.name} name={'Name'} required
                             onChange={(e: any) => setFormCate({...formCate, name: e.target.value})}
                             validate={(text: string) => validateName({...formCate, name: text})}/>
            </div>

            <div style={style}>
                <CommonSelectPrime value={formCate.parentId} name={'Parent category'} disabled={!!formCate.id}
                                   items={categoriesLv1}
                                   onChange={(e: any) => setFormCate({...formCate, parentId: e.target.value})}
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button label={'Cancel'} className={`p-button-text ${styles.cancelButton}`}
                        onClick={() => hideModal ? hideModal() : ''}/>
                <Button label={'Submit'}
                        onClick={() => {
                            formCate.level = formCate.parentId ? 2 : 1;
                            console.log(formCate);
                            onSubmit(formCate)
                        }}/>
            </div>
            <div>
            </div>
        </div>
    );
}


export default CategoryInputComponent;