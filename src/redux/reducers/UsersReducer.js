const initialState = {
  loading: false,
  users: [],
  error: null,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "USERS_ACTION_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "USERS_ACTION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };
    case "USERS_ACTION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "USERS_DELETED_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case "USER_CREATED_SUCCESS": {
      return {
        loading: false,
        error: null
      }
    }
    case "USER_DATA_UPDATED_SUCCESSFULLY": {
      return {
        loading: false,
        error: null
      }
    }
    default:
      return state;
  }
}
