import axios from "axios";
import { getUsers } from "./getUsers";
const url = "http://localhost:8080/";

export const updateUserInfo = (userId, firstname, lastname) => {
  return (dispatch, getState) => {
    let offset = +getState().users.offset;
    let limit = +getState().users.limit - offset;
    dispatch(updateUserDataStarted());
    axios
      .post(`http://localhost:8080/userId=${userId}&firstname=${firstname}&lastname=${lastname}`,{
        headers: {
            "Content-type": "application/json"
          },
          data: {
            userId: userId,
            firstname: firstname,
            lastname: lastname
          }
      })
      .then((res) => {
        dispatch(updateUserDataSuccess(res));
        dispatch(getUsers(offset, limit));
      })
      .catch((err) => {
        dispatch(updateUserDataFailure(err.message));
      });
  };
};

const updateUserDataSuccess = (users) => ({
    type: "USER_DATA_UPDATED_SUCCESSFULLY",
    payload: users,
  });
  
  const updateUserDataStarted = () => ({
    type: "USERS_ACTION_STARTED",
  });
  
  const updateUserDataFailure = (error) => ({
    type: "USERS_ACTION_FAILURE",
    payload: {
      error,
    },
  });