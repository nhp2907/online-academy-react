import React, {ChangeEventHandler, useEffect, useState} from 'react'

interface Props {
    name?: string;
    placeholder?: string;
    type?: string;
    icon?: string;
    value: string;
    inputContainerClassName?: string;
    titleClassName?: string;
    containerClassName?: string;
    errorMessageClassName?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    validate: (text: string) => string;
}


const CommonInput: React.FC<Props> = ({name, placeholder, icon, type, value, onChange, validate, inputContainerClassName, containerClassName, titleClassName,errorMessageClassName}) => {
    const [isFirstTime, setIsFirstTime] = useState(true);
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
    const [errorMessage, setErrorMessage] = useState<string>('');
    return (
        <div className={containerClassName}>
            {name ? <span className={titleClassName}>{name}</span> :''}
            <div className={inputContainerClassName}>
                <i/>
                <input value={value} type={type ? type : 'text'} placeholder={placeholder}
                       onChange={onChange}/>
            </div>
            {errorMessage ? <span className={errorMessageClassName}>{errorMessage}</span> : ''}
        </div>
    );
}

export default CommonInput;