import React, { Component , useEffect } from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import "./css/NavBar.css";
import { withRouter , useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import archikraftconsults from "../Assets/archi-kraft-consults.png";

class NavBar extends Component {
  state = {
    userFirstName: "",
    userLastName: "",
    accountBalance: "",
  };

 

  
  componentDidMount = async () => {   
      if (localStorage.userId) {
        let response = await fetch(
          `https://q-investment-home-back-end.herokuapp.com/users/${localStorage.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        const userDetails = await response.json();
        console.log(userDetails);
  
        this.setState({
          userFirstName: userDetails.firstName,
          userLastName: userDetails.lastName,
        });
        this.fetchAccountBalance();
      }
    
  };

//   componentDidUpdate(prevProps, prevState) {
//   if (prevState.accountBalance !== this.state.accountBalance) {
//     window.location.reload()
//   }
// }

  fetchAccountBalance = async () => {
    let accountBalanceResponse = await fetch(
      `https://q-investment-home-back-end.herokuapp.com/account/${localStorage.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    const balanceFromApi = await accountBalanceResponse.json();
    this.setState({
      accountBalance: balanceFromApi.balance,
    });
  };

  logOut = () => {
    localStorage.clear()
    window.location.href = `https://q-investment-home-front-end.herokuapp.com/`;
  //  window.location.reload()
  }

  
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
            {this.state.userFirstName === "" ? (
              <div className="d-flex flex-row">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
              <Link to={"/SignUp"}>
                <button id="sign-up-btn" >Sign Up</button>
              </Link>
              </div>
            ) : (
              <Link to={"/profile"}>
                <div id="profileContainer">
                  <div>
                    <i class="fa fa-user fa-2x mx-3"></i>
                    <p>
                      {this.state.userFirstName} {this.state.userLastName}
                    </p>
                  </div>
                    <div>
                      {this.state.accountBalance === "" ?  <h5> Bal :  0 </h5> :  <h5>Bal : {this.state.accountBalance}</h5>}
                  </div>
                </div>
              </Link>
              )}
            <Nav.Link  onClick={()=> this.logOut()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(NavBar)
