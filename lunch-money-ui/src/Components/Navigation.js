import React, { Component } from 'react';
import { Navbar, Button, Nav} from 'react-bootstrap';
import '../Style/Navigation.css';

class Navigation extends Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand id="app-title" href="/">Lunch Money <i class="fas fa-utensils"></i> </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Inventory">Inventory</Nav.Link>
            <Nav.Link href="/Dishes">Dishes</Nav.Link>
          </Nav>
          <Nav>
          <Button id="account-buttons" variant="outline-light">Sign Up</Button>
          <Button id="account-buttons" variant="outline-light">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;