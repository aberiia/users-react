import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import store from "./store/store";
import { applyTheme } from "./actions/applyTheme";
import { getUsers } from "./actions/getUsers";
import App from "./App";
import "./index.css";

const mapDispatchToProps = {
    getUsers,
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