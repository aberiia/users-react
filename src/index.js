import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import store from "./redux/store/store";
import { applyTheme } from "./redux/actions/applyTheme";
import { getUsers } from "./redux/actions/getUsers";
import { deleteUser } from "./redux/actions/deleteUser";
import App from "./App.tsx";
import "./index.css";

const mapDispatchToProps = {
    getUsers,
    deleteUser,
    applyTheme
};
connect(
  null,
  mapDispatchToProps
)(App);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);