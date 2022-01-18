import axios from 'axios';

const url = "https://randomuser.me/api/?results=30";
export const getUsers = () => {
  return (dispatch, getState) => {
    dispatch(getUsersStarted());
    console.log("current state: ", getState());
    axios.get(url)
      .then((res) => {
        dispatch(getUsersSuccess(res.data.results));
        })
      .catch((err) => {
        dispatch(getUsersFailure(err.message));
      });
  };
};

const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

const getUsersStarted = () => ({
  type: "GET_USERS_STARTED",
});

const getUsersFailure = (error) => ({
  type: "GET_USERS_FAILURE",
  payload: {
    error,
  },
});
