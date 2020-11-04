import React, { Component } from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import "./css/NavBar.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import archikraftconsults from "../Assets/archi-kraft-consults.png";

class NavBar extends Component {
  state = {
    userDetails: [],
  };
  componentDidMount = async (props) => {
    const id = this.props.match.params.id;
    if (id) {
      console.log("first one");
    } else {
      console.log("second one");
    }
    // const res = await fetch(`http://localhost:3003/users/${id}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    // });

    // const userDetails = await res.json();
    // this.setState({
    //   userDetails,
    // });
    // console.log(this.state.userDetails);
  };
  render() {
    return (
      <Navbar id="navbar-wrapper" expand="lg">
        <Link to={"/"} className="nav-brand">
          <img src={archikraftconsults} id="navBar-brand"></img>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="The Company" className="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to={"/TheCompany"}
                className="navbar-dropdown-anchor"
              >
                The Company
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">
                The Founder
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="How it works" className="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                How it works
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">
                Frequently Asked Questions
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Our Portfolio</Nav.Link>
            <Link to={"/ContactUs"} className="nav-link">
              Contact Us
            </Link>
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
            <Link to={"/SignUp"}>
              <button id="sign-up-btn">Sign Up</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
