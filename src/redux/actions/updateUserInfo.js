import axios from "axios";
import { refetch } from "./refetch";
const url = "http://localhost:8080/";

export const updateUserInfo = (userId, firstname, lastname) => {
  return (dispatch, getState) => {
    let offset = +getState().users.offset;
    
    let limit = +getState().users.limit;
    let refetchLimit = offset;
    let refetchOffset = 0;
    dispatch(updateUserDataStarted());
    axios
      .post(`${url}userId=${userId}&firstname=${firstname}&lastname=${lastname}`,{
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
        dispatch(refetch(refetchLimit, refetchOffset));
      })
      .catch((err) => {
        dispatch(updateUserDataFailure(err.message));
      });
  };
};

const updateUserDataSuccess = (message) => ({
    type: "USER_DATA_UPDATED_SUCCESSFULLY",
    payload: message,
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