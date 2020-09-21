import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./css/Jumbo.css";

class Jumbo extends Component {
  state = {};
  jumboStyle = {
    backgroundImage: 'url("../../assets/resort1.jpg")',
  };
  render() {
    return (
      <Jumbotron className="jumbo">
      <h1>Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
      </p>
    </Jumbotron>
    );
  }
}

export default Jumbo;
