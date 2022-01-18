const initialState = {
    loading: false,
    users: [],
    error: null
  };
  
  export function usersReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_USERS_STARTED":
        return {
          ...state,
          loading: true
        };
      case "GET_USERS_SUCCESS":
        return {
          ...state,
          loading: false,
          error: null,
          users: action.payload
        };
      case "GET_USERS_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      default:
        return state;
    }
  }