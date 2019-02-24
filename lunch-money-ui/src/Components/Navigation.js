import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import '../Style/Navigation.css';

class Navigation extends Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand id="app-title" href="/">Lunch Money <i class="fas fa-utensils"></i> </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="items" href="/Inventory">Inventory</Nav.Link>
            <Nav.Link className="items" href="/Dishes">Dishes</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/Register" className="account" >Sign Up</Nav.Link>
          <Nav.Link href="/Login" className="account" >Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;