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
      <Jumbotron className="jumbo rounded-0">
        <h1 id="jumbo-header">Start Small And Become <br/> A Digital Investor</h1>
        <div>
          <h3 className="jumbo-sub-heading">10% - 17% Holiday Rental Income</h3>
          <h3 className="jumbo-sub-heading mt-2">
            30% - 40% Spa And Resort Income
          </h3>
        </div>
        <Button id="jumbo-btn">Get Started</Button>
      </Jumbotron>
    );
  }
}

export default Jumbo;
