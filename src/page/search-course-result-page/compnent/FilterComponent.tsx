import React from 'react'

import styles from '../search-result-page.module.scss'
import SortComponent from "./SortComponent";
import {Panel} from "primereact/panel";

interface Props {
    input: any[]
    onChange: (list: any) => void
}

const FilterComponent: React.FC<Props> = ({input,onChange}) => {
    const priceChange = (value: string) => {
        console.log('priceChagneValue: ', value);
        switch (value) {
            case 'asce':
                input.sort((a, b) => a.price - b.price);
                onChange([...input])
                break;
            case 'desc':
                input.sort((a, b) => b.price - a.price);
                onChange([...input])
                break;
            default:

        }
    }
    const ratingChange = (value: string) => {
        switch (value) {
            case 'asce':
                input.sort((a, b) => b.rating - a.rating);
                onChange([...input])
                break;
            case 'desc':
                input.sort((a, b) => a.rating - b.rating);
                onChange([...input])
                break;
            default:
        }
    }

    return (
        <div className={styles.filter}>
            <Panel header={'Sort options'} style={{marginBottom: 10}}>
                <SortComponent header={'Price:'}
                               sortOptions={[{code: 'asce', label: 'Ascending'}, {code: 'desc', label: 'Descending'}]}
                               onChange={priceChange}/>
                <SortComponent header={'Rating:'}
                               sortOptions={[{code: 'desc', label: 'Descending'}, {code: 'asce', label: 'Ascending'}]}
                               onChange={ratingChange}/>
            </Panel>
        </div>
    );
}


export default FilterComponent;