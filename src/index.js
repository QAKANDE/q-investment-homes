import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ForgottenPassword from "./Components/ForgottenPassword"
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Route path="/SignUp" exact component={SignUp} />
      <Route path="/Login" exact component={Login} />
      <Route path="/PasswordRecovery" exact component={ForgottenPassword} />
      <Route path="/" exact component={App}></Route>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
