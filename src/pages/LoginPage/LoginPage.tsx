import React, { useCallback, useState } from "react";
import LoginForm from "../../components/Forms/LoginForm";
import LoginSideMask from "../../components/Mask/LoginSideMask";
import "./LoginPage.css";
export default function LoginPage() {
  const clickHandler = (handler: string) => {
    console.log(handler);
  };
  return (
    <div className="login_page-container">
      <div className="login_form-container">   
        <LoginForm />
        <LoginSideMask maskName={"Sign Up"}/>
      </div>
    </div>
  );
}
