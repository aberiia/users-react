import React from 'react'

interface Button{
    id?: string,
    buttonClass: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    handleClose?: React.MouseEventHandler<HTMLButtonElement>,
    buttonValue: string,
    buttonType: string
}

const Button: React.FC<Button> = ({id, handleClose, buttonClass, onClick, buttonValue, buttonType}: Button) => {

    switch (buttonType) {
        case "submit":
            return (
                <input id={id} onClick={onClick}
                       className={buttonClass} type={buttonType}
                       value={buttonValue}/>
            )
        default:
            return (
                <button onClick={handleClose}
                        className={buttonClass}>
                    {buttonValue}
                </button>
            )
    }
}

export default Button;