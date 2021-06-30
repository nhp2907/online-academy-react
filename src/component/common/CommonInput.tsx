import React, {ChangeEventHandler, useEffect, useState} from 'react'

interface Props {
    name?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'select' | 'number' | 'textarea'
    icon?: string;
    value: string | number;
    inputContainerClassName?: string;
    titleClassName?: string;
    containerClassName?: string;
    errorMessageClassName?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    validate: (text: any) => string;
    disabled?: boolean
    autoFocus?: boolean
    required?: boolean
    inputStyle?: any
}


const CommonInput: React.FC<Props> = ({name, placeholder, icon, inputStyle, autoFocus, type, value, onChange, validate, inputContainerClassName, containerClassName, titleClassName, errorMessageClassName, disabled, required}) => {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    useEffect(() => {
        // console.log('Common input update');
        const timer = setTimeout(() => {
            if (isFirstTime) {
                setIsFirstTime(false);
            } else {
                setErrorMessage(validate(value));
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [value])
    return (
        <div className={containerClassName}>
            {name ? <label className={`${titleClassName} ${required == true ? 'required' : ''}`}>{name}</label> : ''}
            <div className={inputContainerClassName || 'p-field'}>
                <i/>
                <input autoFocus={autoFocus == true} style={inputStyle}
                       className={inputContainerClassName || `p-inputtext p-component ${errorMessage ? 'p-invalid' : ''}`}
                       value={value} type={type ? type : 'text'} placeholder={placeholder}
                       onChange={onChange} disabled={disabled}/>
            </div>
            {errorMessage ? <small className={errorMessageClassName || 'p-error'}>{errorMessage}</small> : ''}
        </div>
    );
}

export default CommonInput;