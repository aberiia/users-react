import axios from "axios";
import { history } from "../../helpers/history";
export function logIn (login, password) {
  const url = `http://localhost:8080/api/auth/login`;
  return (dispatch, getState) => {
    dispatch(logInStarted());
    axios
      .post(url, {
          username: login,
          password: password,
      })
      .then((res) => {
        console.log("res", res);
        const token = res.data.token;
        localStorage.setItem('user', token);
      })
      .catch((err) => {
        dispatch(logInFailure(err.message));
      });
  };
};

const logInSuccsess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

const logInStarted = () => ({
  type: "USERS_ACTION_STARTED",
});

const logInFailure = (error) => ({
  type: "USERS_ACTION_FAILURE",
  payload: {
    error,
  },
});