import React, { Component } from "react";
import { Container } from "react-bootstrap";
import LatestInsights from "./LatestInsights";
class TheCompany extends Component {
  state = {};
  render() {
    return (
      <>
        <Container>
          <div className="mt-5 mb-5">
            <h3 className="d-flex justify-content-center">The Company</h3>
            <h5 className="d-flex justify-content-center">
              Archi-Kraft Consults Your Number One Source For All Real Estate
              Investment.
            </h5>
            <p>
              We're dedicated to giving you the very best investment
              opportunities with a focus on three characteristics which are
              dependability, customer service and uniqueness.
            </p>
            <p>
              Founded in 2020 by Quadri Omofolarin Akande . Archi-Kraft Consults
              has come a long way from its beginnings in a [starting location,
              ie: home office, toolshed, Houston, TX.]. When Quadri first
              started out, his passion for real estate drove him to create this
              platform, and gave him the impetus to turn hard work and
              inspiration into to a booming online real estate investment store.{" "}
            </p>
            <p>
              We hope you enjoy our products as much as we enjoy offering them
              to you. If you have any questions or comments, please don't
              hesitate to contact us.
            </p>
            <h4>Sincerely,</h4>
            <h4>Quadri Omofolarin Akande, Founder</h4>
          </div>
        </Container>
        <hr></hr>
        <LatestInsights />
      </>
    );
  }
}

export default TheCompany;
