import React from 'react'

export default function Button({id, buttonClass, onClick, buttonValue, buttonType}) {

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