import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
class Login extends Component {
  state = {
    loginDetails: {
      email: "",
      password: "",
    },
  };

  updateLogin = (event) => {
    let newLoginDetails = this.state.loginDetails;
    let id = event.currentTarget.id;
    newLoginDetails[id] = event.currentTarget.value;
    this.setState({
      newLoginDetails,
    });
  };
  loginHandler = async (e) => {
    e.preventDefault();
    let userInfo = {
      email: this.state.loginDetails.email,
      password: this.state.loginDetails.password,
    };
    let response = await fetch("http://localhost:3002/users/login", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: new Headers({
        "content-Type": "application/json",
      }),
    });

    const generatedToken = await response.json();
    console.log(generatedToken);
    // // localStorage["accessToken"] = token.token;
    // // localStorage["email"] = this.state.loginDetails.email;
    // // if (localStorage.accessToken) {
    // //   const authorize = await fetch("http://localhost:3002/users/me", {
    // //     headers: {
    // //       Authorization: "Bearer " + localStorage.accessToken,
    // //     },
    // //   });
    // //   if (authorize.ok) {
    // //     window.location.href = "http://localhost:3001/";
    // //   } else {
    // //     alert("Please Log in");
    // //   }
    // // }
    // console.log(token);
  };
  render() {
    return (
      <div id="Log-In" className="mt-5">
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
                value={this.state.loginDetails.email}
                placeholder="Email"
                size="md"
                onChange={(e) => this.updateLogin(e)}
              />
              <Form.Control
                htmlFor="password"
                size="md"
                id="password"
                value={this.state.loginDetails.password}
                onChange={(e) => this.updateLogin(e)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <button
              id="Login"
              type="submit"
              className=" mt-3 "
              onClick={(e) => this.loginHandler(e)}
            >
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
              <a>Don't Have An Account ? Sign Up Here</a>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
