import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
class ForgottenPassword extends Component {
  state = {};
  render() {
    return (
      <Container>
        <div className="mt-5">
          <h3 className="d-flex justify-content-center">
            We Understand, These Things Happen...
          </h3>
          <h5 className="d-flex justify-content-center">
            Recover Your Account.
          </h5>
          <h5 className="d-flex justify-content-center">
            Enter Your Email Below To Reset Your Password, An Email With Details
            Will Be Sent To You Shortly.{" "}
          </h5>
          <Form>
            <Form.Group style={{ marginTop: "0" }}>
              <Form.Control
                htmlFor="email"
                className="mb-3"
                type="email"
                id="email"
                placeholder="Email"
                size="md"
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center mb-1">
            <button id="CreateAccount" type="submit" className=" mt-3 ">
              Recover Password
            </button>
          </div>
          <div className="d-flex justify-content-center mb-5">
            <Link to={"/Login"}>
              <a>Login Here</a>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default ForgottenPassword;
