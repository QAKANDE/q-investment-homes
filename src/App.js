import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Jumbo from "./Components/Jumbo";
import About from "./Components/About";
import PropertyListings from "./Components/PropertiesListings";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Jumbo />
      <About />
      <PropertyListings />
    </div>
  );
}

export default App;
