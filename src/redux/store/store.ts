import {createStore, applyMiddleware, compose} from "redux";
import allReducers from "../reducers";
import thunk from 'redux-thunk';

// const store = createStore(allReducers,applyMiddleware(thunk),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

 const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(thunk))
 
  )
export type RootState = ReturnType<typeof store.getState>;
export default store;