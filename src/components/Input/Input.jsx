import React from "react";
import {ReactComponent as Delete} from "../../assets/clear.svg";
import './Input.css';

export default function Input(props) {
    const {inputType,focused, inputValue, inputState, handleInputChange, inputId, inputPlaceholder, handleInputClear, inputLabel, importantStatus} = props
    if (inputType === "text") {
        return (
            <div className={"form-item"}>
                <label htmlFor={inputId}
                       className={importantStatus ? "reg-text imp" : "reg-text"}>{inputLabel}</label>
                <div className="input-wrapper">
                    <input autoFocus={focused} type={inputType} value={inputValue}
                           onChange={handleInputChange}
                           className="text-input" name={inputId}
                           id={inputId} placeholder={inputPlaceholder}/>
                    {inputState[inputId] &&
                    <Delete id={inputId} className="input-clear" onClick={handleInputClear}/>}
                </div>
            </div>
        )
    }
    if (inputType === "number") {
        return (
            <div className={"form-item--numb"}>
                <label htmlFor={inputId}
                       className={"reg-text"}>{inputLabel}</label>
                <input type={inputType} value={inputValue}
                       onChange={handleInputChange}
                       className="numb-input" name={inputId}
                       id={inputId} placeholder={inputPlaceholder}/>
                 <span className={"secondary-text-bright"}>minutes</span>
            </div>
        )
    }
}