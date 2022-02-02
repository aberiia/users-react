import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import Button from "../Buttons/ModalButton";
import { logIn } from "../../redux/actions/login";

import { IInputState } from "../../types/IInput";

import "./LoginForm.css";
export default function LoginForm() {
  const [state, setState] = useState<IInputState>({
    login: "",
    password: "",
    isValid: true,
  });
  const dispatch = useDispatch();

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
  const handleFormSend = useCallback(
    (e) => {
      e.preventDefault();
      const login = state.login;
      const password = state.password;
      if (login.length > 0 && password.length > 0) {
        dispatch(logIn(login, password));
      } else {
        setState({ ...state, valid: false });
      }
    },
    [state, setState]
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
        <Button onClick={handleFormSend} buttonClass={"login-button"} buttonValue={"Login"} buttonType={"submit"} />
      </form>
    </div>
  );
}
