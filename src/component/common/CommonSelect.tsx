import React, {ChangeEventHandler} from 'react'

interface Props {
    name?: string;
    placeholder?: string;
    items: { value: any, label: any }[]
    icon?: string;
    value: string;
    inputContainerClassName?: string;
    titleClassName?: string;
    containerClassName?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    disabled?: boolean
}


const CommonSelect: React.FC<Props> = ({name, items, placeholder, icon, value, onChange, inputContainerClassName, containerClassName, titleClassName, disabled}) => {

    return (
        <div className={containerClassName}>
            {name ? <label className={titleClassName}>{name}</label> : ''}
            <div className={inputContainerClassName || 'p-field'}>
                <i/>
                <select onChange={onChange} value={value} >
                    <option hidden disabled value={''}>{placeholder}</option>
                    {
                        items.map((item: any) => <option value={item.value}>{item.label}</option>)
                    }
                </select>
            </div>
        </div>
    );
}

export default CommonSelect;