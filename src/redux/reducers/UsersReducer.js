const initialState = {
  loading: false,
  users: [],
  error: null,
  count: 0,
  isEnd: false, 
  limit: 3,
  offset: 0
};

export function usersReducer(state = initialState, action) {
  console.log('state', state)
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
      case "GET_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        users: [...state.users, ...action.payload.users],
        count: action.payload.count ,
        isEnd: action.payload.isEnd,
        limit: action.payload.limit,
        offset: action.payload.offset
      };
      case "USERS_REFETCH":{
        return{
          ...state,
          loading: false,
          error: null,
          users: action.payload.users,
          count: action.payload.count ,
          isEnd: action.payload.isEnd,
          limit: action.payload.limit,
          offset: action.payload.offset
        }
      }
      case "GET_USERS_LIMIT": 
      return {
        ...state,
        loading: false,
        error: null,
      }
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
        ...state,
        loading: false,
        error: null
      }
    }
    case "USER_DATA_UPDATED_SUCCESSFULLY": {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    default:
      return state;
  }
}
