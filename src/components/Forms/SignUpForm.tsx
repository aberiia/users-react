import React, { useCallback, useState } from "react";
import Input from "../Input/Input";
import { IInputState } from "../../types/IInput";
import Button from "../Buttons/ModalButton";
import { Link } from "react-router-dom";

export default function SignUpForm() {
    const [state, setState] = useState<IInputState>({
      email: "",
      password: "",
      passwordConfirm: "",
      isValid: true,
    });
  
    const handleClear = useCallback(
      (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        setState({ ...state, [id]: "" });
      },
      [state, setState]
    );
  
    const handleInputChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value,
        });
      },
      [state]
    );
  
    return (
      <div className="signup_form-wrapper">
        <form action="#" className="login_form">
          <h1 className="form-header">Sign Up</h1>
          <Input
            inputType={"text"}
            inputValue={state.email}
            inputState={state}
            handleInputChange={handleInputChange}
            inputId={"email"}
            inputPlaceholder={"e-mail"}
            handleInputClear={handleClear}
            inputLabel={"E-mail"}
          />
          <Input
            inputType={"password"}
            inputValue={state.password}
            inputState={state}
            handleInputChange={handleInputChange}
            inputId={"password"}
            inputPlaceholder={""}
            handleInputClear={handleClear}
            inputLabel={"Password"}
          />
          <Input
            inputType={"password"}
            inputValue={state.passwordConfirm}
            inputState={state}
            handleInputChange={handleInputChange}
            inputId={"passwordConfirm"}
            inputPlaceholder={""}
            handleInputClear={handleClear}
            inputLabel={"Confirm password"}
          />
          <Button buttonClass={"sign_up-button"} buttonValue={"Sign Up"} buttonType={"submit"} />
        </form>
      </div>
    );
  }
  
