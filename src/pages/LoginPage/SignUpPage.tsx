import React, { useCallback, useState } from "react";
import Button from "../../components/Buttons/ModalButton";
import SignUpForm from "../../components/Forms/SignUpForm";
import LoginSideMask from "../../components/Mask/LoginSideMask";
import "./LoginPage.css";
export default function SignUpPage() {

  return (
    <div className="login_page-container">
    <div className="login_form-container">   
     
      <LoginSideMask maskName={"Log In"}/>
      <SignUpForm />
    </div>
    </div>
  );
}