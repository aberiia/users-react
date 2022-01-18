import React from 'react'

interface Button{
    id: string,
    buttonClass: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    buttonValue: string,
    buttonType: string
}

const Button: React.FC<Button> = ({id, buttonClass, onClick, buttonValue, buttonType}: Button) => {

    switch (buttonType) {
        case "submit":
            return (
                <input id={id} onClick={onClick}
                       className={buttonClass} type={buttonType}
                       value={buttonValue}/>
            )
        default:
            return (
                <button onClick={onClick}
                        className={buttonClass}>
                    {buttonValue}
                </button>
            )
    }
}

export default Button;