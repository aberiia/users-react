import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useCallback } from 'react';
import Button from '../Buttons/ModalButton';
import Input from '../Input/Input';
import { SumbitHandler } from '../../types/Handlers';
import './Modal.css';
interface ModalForm {
    theme: string,
    id: string,
    onClose: React.MouseEventHandler<HTMLButtonElement>,
    submitHandler: SumbitHandler,
    isOpen: boolean,
    firstname: string,
    lastname: string
}
const modalRoot = document.getElementById("root") as HTMLElement; 

const ModalForm: React.FC<ModalForm> = ({theme, id, onClose, submitHandler, isOpen, firstname, lastname }: ModalForm) => {
    const [state, setState] = useState({
        "user-firstname": firstname,
        "user-lastname": lastname,
        "valid": true
    });

    const handleChange = useCallback((evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }, [state]);

    // form's submit button callback
    const handleClick = useCallback((e) => {
        e.preventDefault();
        if (state["user-firstname"].length > 0 && state["user-lastname"].length > 0) {
            submitHandler(e, state['user-firstname'], state['user-lastname']);
            setState({ ...state, valid: true })
            onClose(e);
        } else {
            setState({ ...state, "valid": false })
        }
    }, [state]);

    // input's clear button callback
    const handleClear = useCallback(e => {
        e.preventDefault();
        const id = e.currentTarget.id;
        setState({ ...state, [id]: '' })
    }, [state, setState]);

    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className={theme === "light"? "modal-wrapper": "modal-wrapper--dark"}>
            <form action="#" className="card-modal">
                <h3>Edit user data</h3>
                {!state.valid && <span className="modal-error">Fill out user data</span>}

                <Input focused={true} inputType={"text"} inputValue={state["user-firstname"]} inputState={state}
                    handleInputChange={handleChange}
                    handleInputClear={handleClear}
                    inputId={"user-firstname"} inputLabel={'First name'} inputPlaceholder={firstname} />


                <Input inputType={"text"} inputValue={state["user-lastname"]} inputLabel={'Last name'} inputState={state}
                    handleInputChange={handleChange}
                    handleInputClear={handleClear}
                    inputId={"user-lastname"} inputPlaceholder={lastname} />

                <div className="buttons-wrapper">
                    <Button id={id} buttonType={"submit"} onClick={handleClick}
                        buttonClass={"button-action"} buttonValue={"Save"} />
                    <Button handleClose={onClose} buttonValue={"Cancel"} buttonClass={"button-control"}
                        buttonType={"close-modal"} />
                </div>
            </form>
        </div>,
        modalRoot)


}

export default ModalForm;