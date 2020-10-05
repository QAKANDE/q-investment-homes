import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

class About extends Component {
  state = {};
  render() {
    return (
      <>
        <Container>
          <div id="about" className="mt-4">
            <h3 className="d-flex justify-content-center">
              About Archi-Kraft Consults
            </h3>
            <h5 className="d-flex justify-content-center">
              Archi-Kraft Consults Your Number One Source For All Real Estate
              Investment.
            </h5>
            <p>
              We're dedicated to giving you the very best investment
              opportunities with a focus on three characteristics which are
              dependability, customer service and uniqueness.
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
        <hr></hr>
      </>
    );
  }
}

export default About;
