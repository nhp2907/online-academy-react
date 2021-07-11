import React, {ChangeEventHandler} from 'react'
import {Dropdown} from "primereact/dropdown";

interface Props {
    name?: string;
    placeholder?: string;
    items: { value: any, label: any }[]
    icon?: string;
    value?: any;
    inputContainerClassName?: string;
    titleClassName?: string;
    containerClassName?: string;
    onChange?: (value: any)=> void;
    disabled?: boolean
    required?: boolean
}


const CommonSelectPrime: React.FC<Props> = ({name, items, placeholder, icon, value, onChange, inputContainerClassName, containerClassName, titleClassName, disabled, required}) => {

    return (
        <div className={containerClassName}>
            {name ? <label className={`${titleClassName} ${required === true ? 'required' : ''}`}>{name}</label> : ''}
            <div className={inputContainerClassName || 'p-field'}>
                <i/>
                <Dropdown value={value} options={items} onChange={onChange} placeholder={placeholder}/>
            </div>
        </div>
    );
}

export interface SelectItem {
    label :any,
    value: any
}

export default CommonSelectPrime;
