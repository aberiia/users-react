import React from "react";
import { Link } from "react-router-dom";
import SignUpImg from "../../assets/signup.jpg";
import LogInImg from "../../assets/login.jpg";
import "./LoginSideMask.css";

export default function LoginSideMask({ maskName }) {
  if (maskName === "Sign Up") {
    return (
      <Link to="/signup" className="mask-wrap--right">
        <p>{maskName}</p>
        <div className="mask-image">
          <div className="mask-wrap--blur"></div>
          <img src={SignUpImg} alt="" />
        </div>
      </Link>
    );
  } else {
    return (
      <Link to="/login" className="mask-wrap--left">
        <p>{maskName}</p>
        <div className="mask-image">
          <div className="mask-wrap--blur"></div>
          <img src={LogInImg} alt="" />
        </div>
      </Link>
    );
  }
}
