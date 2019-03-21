import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import '../Style/Navigation.css';

class LoginNavigation extends Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand id="app-title" href="/">Lunch Money <i className="fas fa-utensils"></i> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
          <Nav>
          <Nav.Link href="/Register" className="account" >Sign Up</Nav.Link>
          <Nav.Link href="/" className="account" >Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoginNavigation;