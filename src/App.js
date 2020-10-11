import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Jumbo from "./Components/Jumbo";
import About from "./Components/About";
import PropertyListings from "./Components/PropertiesListings";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GroupBuying from "./Components/GroupBuying";
import LatestInsights from "./Components/LatestInsights";

function App(props) {
  return (
    <div className="App">
      <Jumbo />
      <About />
      <PropertyListings {...props}/>
      <LatestInsights />
    </div>
  );
}

export default App;
