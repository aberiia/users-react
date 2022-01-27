import axios from "axios";
import { getUsers } from "./getUsers";

const url = "http://localhost:8080/";

export const createNewUser = (id, firstname, lastname, birthDate, email) => {
  return (dispatch, getState) => {
    dispatch(createUserStarted());
    let offset = +getState().users.offset + 1;
    let limit = 1;
    axios
      .post(`${url}id=${id}&firstname=${firstname}&lastname=${lastname}&birthDate=${birthDate}&email=${email}`,{
        headers: {
            "Content-type": "application/json"
          },
          data: {
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email
          }
      })
      .then((res) => {
        dispatch(createUserSuccess(res));
        dispatch(getUsers(offset, limit));
      })
      .catch((err) => {
        dispatch(createUserFailure(err.message));
      });
  };
};

const createUserSuccess = (users) => ({
    type: "USERS_CREATED_SUCCESS",
    payload: users,
  });
  
  const createUserStarted = () => ({
    type: "USERS_ACTION_STARTED",
  });
  
  const createUserFailure = (error) => ({
    type: "USERS_ACTION_FAILURE",
    payload: {
      error,
    },
  });