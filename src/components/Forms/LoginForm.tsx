import React, { useCallback, useState } from "react";
import Input from "../Input/Input";
import { IInputState } from "../../types/IInput";
import Button from "../Buttons/ModalButton";
import { Link } from "react-router-dom";

import "./LoginForm.css";
export default function LoginForm() {
  const [state, setState] = useState<IInputState>({
    login: "",
    password: "",
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
    <div className="login_form-wrapper">
      <form action="#" className="login_form">
        <h1 className="form-header">Log In</h1>
        <Input
          inputType={"text"}
          inputValue={state.login}
          inputState={state}
          handleInputChange={handleInputChange}
          inputId={"login"}
          inputPlaceholder={"e-mail or phone"}
          handleInputClear={handleClear}
          inputLabel={"Login"}
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
        <Link to="/reset" className="reset_link">
          Forgot password?
        </Link>
        <Button buttonClass={"login-button"} buttonValue={"Login"} buttonType={"submit"} />
      </form>
    </div>
  );
}
