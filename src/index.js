import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import store from "./store/store";
import { setLightTheme, setDarkTheme } from "./actions/applyTheme";
import App from "./App";
import "./index.css";

const mapDispatchToProps = {
  setDarkTheme,
  setLightTheme,
};

connect(null, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);