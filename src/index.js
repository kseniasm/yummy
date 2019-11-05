import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/App";
import { configureStore } from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./components/ScrollToTop";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
   
      <ScrollToTop>    {/*to fix issues with top scrolling, when moving to another page */}
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
