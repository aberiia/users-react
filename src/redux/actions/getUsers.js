import axios from 'axios';

const url = "http://localhost:8080/";
export const getUsers = () => {
  return (dispatch, getState) => {
    dispatch(getUsersStarted());
    console.log("current state: ", getState());
    axios.get(url)
      .then((res) => {
        dispatch(getUsersSuccess(res.data));
        })
      .catch((err) => {
        dispatch(getUsersFailure(err.message));
      });
  };
};

const getUsersSuccess = (users) => ({
  type: "USERS_ACTION_SUCCESS",
  payload: users,
});

const getUsersStarted = () => ({
  type: "USERS_ACTION_STARTED",
});

const getUsersFailure = (error) => ({
  type: "USERS_ACTION_FAILURE",
  payload: {
    error,
  },
});
