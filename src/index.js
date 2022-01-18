import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import store from "./redux/store/store";
import { applyTheme } from "./redux/actions/applyTheme";
import { getUsers } from "./redux/actions/getUsers";
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