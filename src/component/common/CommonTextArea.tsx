import React, {ChangeEventHandler, useEffect, useState} from 'react'

interface Props {
    name?: string;
    placeholder?: string;
    icon?: string;
    value: string | number;
    inputContainerClassName?: string;
    titleClassName?: string;
    containerClassName?: string;
    errorMessageClassName?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    validate: (text: any) => string;
    disabled?: boolean
    autoFocus?: boolean
}


const CommonTextArea: React.FC<Props> = ({name, placeholder, icon, autoFocus, value, onChange, validate, inputContainerClassName, containerClassName, titleClassName, errorMessageClassName, disabled}) => {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    useEffect(() => {
        console.log('autofocus', autoFocus)
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
            {name ? <label className={titleClassName}>{name}</label> : ''}
            <div className={inputContainerClassName || 'p-field'}>
                <i/>
                <textarea autoFocus={autoFocus == true}
                          className={inputContainerClassName || `p-inputtext p-inputtextarea p-component ${errorMessage ? 'p-invalid' : ''}`}
                          value={value} placeholder={placeholder}
                          onChange={onChange} disabled={disabled}/>
            </div>
            {errorMessage ? <small className={errorMessageClassName || 'p-error'}>{errorMessage}</small> : ''}
        </div>
    );
}

export default CommonTextArea;