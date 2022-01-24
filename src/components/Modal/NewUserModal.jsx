import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useState, useCallback } from "react";
import Button from "../Buttons/ModalButton";
import Input from "../Input/Input";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createNewUser } from "../../redux/actions/createNewUser";
import "./Modal.css";

const modalRoot = document.getElementById("root");

const NewUserModal = ({ isOpen, theme, onClose }) => {
  const [state, setState] = useState({
    "user-firstname": "",
    "user-lastname": "",
    "user-email": "",
    valid: true,
  });
  const dispatch = useDispatch();
  // outside click handler
  const ref = useRef();
  useOutsideClick(ref, onClose);

  const handleChange = useCallback(
    (evt) => {
      const value = evt.target.value;
      setState({
        ...state,
        [evt.target.name]: value,
      });
    },
    [state]
  );

  // form's submit button callback
  const submitHandler = (firstname,lastname,birthDate, email) => {
    const userId = uuidv4();
    console.log('firsname', firstname,lastname,email);
    dispatch(createNewUser(userId, firstname, lastname,birthDate, email));
  };

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const firstname = state["user-firstname"];
      const lastname = state["user-lastname"];
      const email = state["user-email"];
      const birthDate = Date.now();
      if (firstname.length > 0 && lastname.length > 0 && email.length > 0) {
        submitHandler(firstname, lastname,birthDate, email);
        setState({ ...state, valid: true });
        onClose(e);
      } else {
        setState({ ...state, valid: false });
      }
    },
    [state]
  );

  // input's clear button callback
  const handleClear = useCallback(
    (e) => {
      e.preventDefault();
    },
    [state, setState]
  );

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={theme === "light" ? "modal-wrapper" : "modal-wrapper--dark"}
    >
      <form ref={ref} action="#" className="card-modal">
        <h3>Create new user</h3>
        {!state.valid && (
          <span className="modal-error">Fill out user data</span>
        )}

        <Input
          focused={true}
          inputType={"text"}
          inputValue={state["user-firstname"]}
          inputState={state}
          handleInputChange={handleChange}
          handleInputClear={handleClear}
          inputId={"user-firstname"}
          inputLabel={"First name"}
          inputPlaceholder={""}
        />

        <Input
          inputType={"text"}
          inputValue={state["user-lastname"]}
          inputLabel={"Last name"}
          inputState={state}
          handleInputChange={handleChange}
          handleInputClear={handleClear}
          inputId={"user-lastname"}
          inputPlaceholder={""}
        />
        <Input
          inputType={"text"}
          inputValue={state["user-email"]}
          inputLabel={"Email"}
          inputState={state}
          handleInputChange={handleChange}
          handleInputClear={handleClear}
          inputId={"user-email"}
          inputPlaceholder={""}
        />

        <div className="buttons-wrapper">
          <Button
            id={"add-new-user"}
            buttonType={"submit"}
            onClick={handleClick}
            buttonClass={"button-action"}
            buttonValue={"Add"}
          />
          <Button
            handleClose={onClose}
            buttonValue={"Cancel"}
            buttonClass={"button-control"}
            buttonType={"close-modal"}
          />
        </div>
      </form>
    </div>,
    modalRoot
  );
};

export default NewUserModal;
