import axios from "axios";
import { getUsers } from "./getUsers";
import { refetch } from "./refetch";

const url = "http://localhost:8080/";

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteUserStarted());
    const limit = 3;
    const offset = 0;
    console.log('limit', limit)
    // let limit = 3;
    // let offset = +getState().users.offset;
   
    axios
      .delete(`http://localhost:8080/api/deleteUser/${id}`,{
        headers: {
            "Content-type": "application/json"
          },
          data: {
            user: id
          }
      })
      .then((res) => {
        dispatch(deleteUserSuccess(res));
        dispatch(refetch(limit,offset));
      })
      .catch((err) => {
        dispatch(deleteUserFailure(err.message));
      });
  };
};

const deleteUserSuccess = (users) => ({
    type: "USER_DELETED_SUCCESS",
    payload: users,
  });
  
  const deleteUserStarted = () => ({
    type: "USERS_ACTION_STARTED",
  });
  
  const deleteUserFailure = (error) => ({
    type: "USERS_ACTION_FAILURE",
    payload: {
      error,
    },
  });