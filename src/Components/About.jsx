import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import users from "../Assets/users.svg";
import home from "../Assets/homes.svg";
import "./css/About.css";

class About extends Component {
  state = {};
  render() {
    return (
      <>
        <Container>
          <div id="about">
            <h3 className="text-center" id="about-header">
              About Archi-Kraft Consults
            </h3>
            <h5 className="text-center">
              Archi-Kraft Consults Your Number One Source For All Real Estate
              Investment.
            </h5>
            <p>
              We're dedicated to giving you the very best investment
              opportunities with a focus on three characteristics which are
              dependability, customer service and uniqueness.
            </p>
          </div>
          <Row className="text-center" id="icon-row">
            <Col>
              <div className="d-flex flex-column">
                {/* <i class="fa fa-users fa-5x"></i> */}
                <div>
                  <img src={users} className="user-img"></img>
                </div>
                <p>200+ Investors</p>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                {/* <i class="fa fa-home fa-5x"></i> */}
                <div>
                  <img src={home} className="user-img"></img>
                </div>
                <p>100+ Properties</p>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default About;
