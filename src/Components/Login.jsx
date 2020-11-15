import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
class Login extends Component {
  state = {
    loginDetails: {
      email: "",
      password: "",
    },
  };

  updateLogin = (event) => {
    let loginDetails = this.state.loginDetails;
    let id = event.currentTarget.id;
    loginDetails[id] = event.currentTarget.value;
    this.setState({
      loginDetails,
    });
  };
  loginHandler = async (e) => {
    e.preventDefault();
   
    let response = await fetch("http://localhost:3003/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.loginDetails.email, 
        password : this.state.loginDetails.password
      }) , 
       headers: {
          "Content-Type": "Application/json",
        },
    });
    if (response.ok) {
      const token = await response.text();
      localStorage["accessToken"] = token ;
    localStorage["email"] = this.state.loginDetails.email;
    if (localStorage.accessToken) {
      const authorize = await fetch(
        `http://localhost:3003/users/${localStorage.email}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.accessToken,
          },
        }
      );
      if (authorize.ok) {
        const userDetails = await authorize.json()
        userDetails.map((id) => {
          return localStorage["userId"] = id._id
        })
        // this.props.history.push(`/user/${localStorage.userId}`)
     window.location.href = `http://localhost:3000/user/${localStorage.userId}`;
      }
    } else {
      alert("Please Log in");
    }
    }

    else {
      alert("Oops , something went wrong ....")
    }
   
  };
  // loginHandler = async (e) => {
  //   e.preventDefault();

  //   let response = await fetch("http://localhost:3003/users/login", {
  //     method: "POST",
  //     body: JSON.stringify(this.state.loginDetails),
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //   });
  //   if (response.ok) {
  //     const token = await response.json();
  //     console.log(token);
  //   } else {
  //     alert("Error Occured");
  //   }

  //   // localStorage["accessToken"] = generatedToken.token;
  //   // localStorage["email"] = this.state.loginDetails.email;
  //   // if (localStorage.accessToken) {
  //   //   const authorize = await fetch("http://localhost:3002/users/me", {
  //   //     headers: {
  //   //       Authorization: "Bearer " + localStorage.accessToken,
  //   //     },
  //   //   });
  //   //   if (authorize.ok) {
  //   //     window.location.href = "http://localhost:3001/";
  //   //   } else {
  //   //     alert("Please Log in");
  //   //   }
  //   // }
  // };
  render() {
    return (
      <div id="Log-In" className="mt-5">
        <h3 className="text-center mt-5">Log In</h3>
        <h3 className="text-center mt-4">Sign Into An Existing Account</h3>
        <Container>
          <Form className="mt-5" >
            <Form.Group style={{ marginTop: "1rem" }}>
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
            <div className="text-center mt-3">
              <button id="Login" type="submit" className=" mt-3" onClick={(e) => this.loginHandler(e)}>
                Log In
              </button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <Link to={"/PasswordRecovery"}>
              <a>Forgotten Password ? </a>
            </Link>
          </div>
          <div className="text-center mt-3 mb-5">
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
