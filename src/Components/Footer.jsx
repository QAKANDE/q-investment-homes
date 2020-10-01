import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div id="Footer">
        <Container>
          <Row>
            <Col>
              <span className="Footer-header">Business</span>
              <br />
              <a className="footer-anchor" href="#">
                Invest In Properties
              </a>
              <br />
              <a className="footer-anchor" href="#">
                Calculate ROI
              </a>
            </Col>
            <Col>
              <span className="Footer-header">About Us</span>
              <br />
              <a className="footer-anchor" href="#">
                What We Do
              </a>
              <br />
              <a className="footer-anchor" href="#">
                Our Team
              </a>
            </Col>
            <Col>
              <span className="Footer-header">Terms And Conditions</span>
              <br />
              <Link to={"/PrivacyPolicy"}>
                <a className="footer-anchor" href="#">
                  Privacy Policy
                </a>
              </Link>
              <br />
              <Link to={"/TermsOfUse"}>
              <a className="footer-anchor" href="#">
                Terms Of Use
              </a>
              </Link>
            </Col>
            <Col>
              <span className="Footer-header">Contact Us</span>
            </Col>
            <Col>
              <span className="Footer-header">Social Media</span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
