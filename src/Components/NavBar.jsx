import React, { Component } from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import "./css/NavBar.css";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar id="navbar-wrapper" expand="lg">
        <Navbar.Brand href="#home">BRAND PLACEHOLDER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="The Company" className="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-dropdown-anchor" href="#action/3.1">
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
              <NavDropdown.Item href="#action/3.2">About</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Frequently Asked Questions
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Our Portfolio</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
            <Button>Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
