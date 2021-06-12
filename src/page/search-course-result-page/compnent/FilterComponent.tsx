import React from 'react'

import styles from '../search-result-page.module.scss'
import SortComponent from "./SortComponent";
import {Panel} from "primereact/panel";

interface Props {

}

const FilterComponent: React.FC<Props> = ({}) => {
    return (
        <div className={styles.filter}>
            <Panel header={'Sort options'} style={{marginBottom: 10}}>
                <SortComponent header={'Price:'} sortOptions={[{code: 'asce', label: 'Ascending'}, {code: 'desc', label: 'Descending'}]}/>
                <SortComponent header={'Rating:'} sortOptions={[{code: 'asce', label: 'Ascending'}, {code: 'desc', label: 'Descending'}]}/>
            </Panel>
        </div>
    );
}


export default FilterComponent;