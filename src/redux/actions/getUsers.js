import axios from "axios";

export const getUsers = (limit, offset) => {
  const url = `http://localhost:8080/limit=${limit}&offset=${offset}`;
  return (dispatch, getState) => {
    dispatch(getUsersStarted());
    console.log("current state: ", getState());
    axios
      .get(url)
      .then((res) => {
        console.log("res", res);
        dispatch(
          getUsersSuccess(res.data.users, res.data.count, res.data.isEnd, res.data.limit, res.data.offset)
        );
      })
      .catch((err) => {
        dispatch(getUsersFailure(err.message));
      });
  };
};

const getUsersSuccess = (users, count, isEnd,limit, offset) => ({
  type: "GET_USERS_SUCCESS",
  payload: { users: users, count: count, isEnd: isEnd, limit: limit, offset: offset },
});

const getUsersLimit = () => ({
  type: "GET_USERS_LIMIT",
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
