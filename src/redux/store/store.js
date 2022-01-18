import {createStore, applyMiddleware} from "redux";
import allReducers from "../reducers";
import thunk from 'redux-thunk';

// const store = createStore(allReducers,applyMiddleware(thunk),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


 const store = createStore(
    allReducers,
    applyMiddleware(thunk)
  )

export default store;