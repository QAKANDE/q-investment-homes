import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
class Login extends Component {
  state = {};
  render() {
    return (
      <div id="Log-In" className="text-center">
        <h3 className="d-flex justify-content-center">Log In</h3>
        <h3 className="d-flex justify-content-center">
          Sign Into An Existing Account
        </h3>
        <Container>
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
              <Form.Control
                htmlFor="password"
                size="md"
                id="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <button id="Login" type="submit" className=" mt-3 ">
              Log In
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <Link to={"/PasswordRecovery"}>
              <a>Forgotten Password ? </a>
            </Link>
          </div>
          <div className="d-flex justify-content-center mb-5">
            <Link to={"/SignUp"}>
              <a>Dont Have An Account ? Sign Up Here</a>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
