import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

class About extends Component {
  state = {};
  render() {
    return (
      <Container>
        <div id="about" className="mt-4">
          <h3 className="d-flex justify-content-center">
            About Archi-Kraft Consults
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <Row className="d-flex justify-content-center">
          <Col>
            <div className="d-flex flex-column">
              <i class="fa fa-users fa-5x"></i>
              <p>200+ Investors</p>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column">
              <i class="fa fa-home fa-5x"></i>
              <p>100+ Properties</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
