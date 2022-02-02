import React from "react";
import {ReactComponent as Delete} from "../../assets/clear.svg";
import { IInput } from "../../types/IInput";
import './Input.css';


export default function Input(props: IInput) {
    const {inputType,focused, inputValue, inputState, handleInputChange, inputId, inputPlaceholder, handleInputClear, inputLabel} = props
    return (
            <div className={"form-item"}>
                <label htmlFor={inputId}
                       className={"reg-text"}>{inputLabel}</label>
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