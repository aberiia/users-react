import {createStore, applyMiddleware, compose} from "redux";
import allReducers from "../reducers";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(allReducers,applyMiddleware(thunk),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const composeEnhancers =
// composeWithDevTools() : compose;

 const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunk))
 
  )
export type RootState = ReturnType<typeof store.getState>;
export default store;