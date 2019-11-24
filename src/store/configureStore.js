import { createStore, applyMiddleware } from "redux";
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../store/reducers/rootReducer";
import thunk from "redux-thunk";

// const rrfConfig = {
//   userProfile: 'users',
//   attachAuthIsReady: true,
//   useFirestoreForProfile: true,
//   //updateProfileOnLogin: false
// };

export const configureStore = initialState => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
};
