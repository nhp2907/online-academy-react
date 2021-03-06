import React, {useState} from 'react'

interface Props {
    header: string;
    sortOptions: { code: string; label: string }[]
    initValue?: 'desc' | 'asce' | '',
    onChange: (value: string) => void
}

const SortComponent: React.FC<Props> = ({header, initValue = '', sortOptions, onChange}) => {
    const [sortOptionIndex, setSortOptionIndex] = useState(0);
    const getIcon = () => {
        const {code} = sortOptions[sortOptionIndex];
        switch (code) {
            case 'desc':
                return 'pi pi-sort-amount-down';
            case 'asce':
                return 'pi pi-sort-amount-down-alt';
            default:
                return 'pi pi-sort';
        }
    }
    const getLabel = () => {
        const {label} = sortOptions[sortOptionIndex];
        return label;
    }

    const onChange_ = (e: any) => {
        const newIndex = sortOptionIndex === (sortOptions.length - 1) ? 0 : sortOptionIndex + 1;
        setSortOptionIndex(newIndex);
        onChange(sortOptions[newIndex].code)
    }

    return (
        <div>
            <div>
                <div style={{display: 'flex', alignItems: "center"}}
                     onClick={onChange_}>
                    <span style={{
                        marginRight: '1.4rem',
                        display: 'inline-block',
                        width: 40,
                        fontWeight: 500
                    }}>{header}</span>
                    <div className={'div-hover'}>
                        <i className={getIcon()} style={{fontSize: 14}}/>
                        <span style={{marginLeft: '0.5rem', fontSize: 14}}>{getLabel()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SortComponent;