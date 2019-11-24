import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/App";
import { configureStore } from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./components/ScrollToTop";

import ReduxToastr from "react-redux-toastr";
import firebase from "./config/firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

const initialState = window && window.__INITIAL_STATE__;

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      dispatch={store.dispatch}
      config={rrfConfig}
      createFirestoreInstance={createFirestoreInstance}
    >
      >
      <BrowserRouter>
        <ReduxToastr
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <ScrollToTop>
          {/*to fix issues with top scrolling, when moving to another page */}
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
