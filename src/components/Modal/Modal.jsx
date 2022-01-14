import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useCallback } from 'react';
import Button from '../Buttons/Button';
import Input from '../Input/Input';

import './Modal.css';

export default function ModalForm({ id, onClose, submitHandler, isOpen, firstname, lastname }) {
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
            onClose();
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
        <div className={"modal-wrapper"}>
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
                    <Button onClick={onClose} buttonValue={"Cancel"} buttonClass={"button-control"}
                        buttonType={"close-modal"} />
                </div>
            </form>
        </div>,
        document.querySelector('#root'))


}