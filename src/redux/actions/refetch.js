import axios from "axios";

export const refetch = (limit, offset) => {
  const url = `http://localhost:8080/api/paginateUsers/limit=${limit}&offset=${offset}`;
  return (dispatch, getState) => {
    dispatch(refetchStarted());
    axios
      .get(url)
      .then((res) => {
        console.log("res", res);
        dispatch(
          refetchSuccess(res.data.users, res.data.count, res.data.isEnd, res.data.limit, res.data.offset)
        );
      })
      .catch((err) => {
        dispatch(refetchFailure(err.message));
      });
  };
};

const refetchSuccess = (users, count, isEnd,limit, offset) => ({
  type: "USERS_REFETCH",
  payload: { users: users, count: count, isEnd: isEnd, limit: limit, offset: offset },
});

const refetchStarted = () => ({
  type: "USERS_ACTION_STARTED",
});

const refetchFailure = (error) => ({
  type: "USERS_ACTION_FAILURE",
  payload: {
    error,
  },
});
