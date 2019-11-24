import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import recipeReducer from "./recipeReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import asyncReducer from "./asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  recipes: recipeReducer,
  form: FormReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
