import React from "react";
import { Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

export const PrivateRoute = ({ component: Component }) => {
  const auth = localStorage.getItem("user");

  return auth ? <Component /> : <Navigate to="/login" />;
};
