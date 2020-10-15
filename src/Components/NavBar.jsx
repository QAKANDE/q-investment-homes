import React, { Component } from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import "./css/NavBar.css";
import { Link } from "react-router-dom";
import archikraftconsults from "../Assets/archi-kraft-consults.png";

class NavBar extends Component {
  // state = { hidden: false };
  // componentWillMount() {
  //   // When this component mounts, begin listening for scroll changes
  //   window.addEventListener("scroll", this.handleScroll);
  // }
  // componentWillUnmount() {
  //   // If this component is unmounted, stop listening
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  // handleScroll(e) {
  //   let lastScrollTop = 0;
  //   const currentScrollTop = Navbar.scrollTop;

  //   // Set the state of hidden depending on scroll position
  //   // We only change the state if it needs to be changed
  //   if (this.state.hidden && currentScrollTop > lastScrollTop) {
  //     this.setState({ hidden: true });
  //   } else if (this.state.hidden) {
  //     this.setState({ hidden: false });
  //   }
  //   lastScrollTop = currentScrollTop;
  // }

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

export default NavBar;
