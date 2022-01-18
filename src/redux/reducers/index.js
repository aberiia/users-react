import {combineReducers} from "redux";
import { themeReducer as theme } from "./ThemeReducer";
import { usersReducer as users } from "./UsersReducer";

const allReducers = combineReducers({
   theme,
   users
})

export default allReducers;