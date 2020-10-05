import React, { Component } from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import "./css/Jumbo.css";

class Jumbo extends Component {
  state = {};
  jumboStyle = {
    backgroundImage: 'url("../../assets/resort1.jpg")',
  };
  render() {
    return (
      <Jumbotron className="jumbo">
        <h1>Start Small And Become A Digital Investor</h1>
        <h3>10% - 17% Holiday Rental Income</h3>
        <h3>30% - 40% Spa And Resort Income</h3>
        <Button>Get Started</Button>
      </Jumbotron>
    );
  }
}

export default Jumbo;
