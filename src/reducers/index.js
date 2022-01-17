import {combineReducers} from "redux";
import { themeReducer as theme } from "./ThemeReducer";

const allReducers = combineReducers({
   theme
})

export default allReducers;