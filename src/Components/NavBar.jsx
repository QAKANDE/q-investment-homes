import React, { Component } from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import "./css/NavBar.css";
import { Link } from "react-router-dom";
import archikraftconsults from "../Assets/archi-kraft-consults.png";

class NavBar extends Component {
  state = {};
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
                className="navbar-dropdown-anchor"
                href="#action/3.1"
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
            <Nav.Link href="#link">Contact Us</Nav.Link>
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

export default NavBar;
