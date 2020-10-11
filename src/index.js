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
import ForgottenPassword from "./Components/ForgottenPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CalculateROI from "./Components/CalculateROI";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfUse from "./Components/TermsOfUse";
import TheCompany from "./Components/TheCompany";
import ContactUs from "./Components/ContactUs";
import Details from "./Components/Details";
import DetailsModal from "./Components/DetailsModal";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Route path="/SignUp" exact component={SignUp} />
      <Route path="/Login" exact component={Login} />
      <Route path="/PasswordRecovery" exact component={ForgottenPassword} />
      <Route path="/CalculateROI/:id" exact component={CalculateROI} />
      <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
      <Route path="/TermsOfUse" exact component={TermsOfUse} />
      <Route path="/TheCompany" exact component={TheCompany} />
      <Route path="/ContactUs" exact component={ContactUs} />
      <Route path="/Details/:id" exact component={Details} />
      <Route path="/Detailss/:id" exact component={DetailsModal} />
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
