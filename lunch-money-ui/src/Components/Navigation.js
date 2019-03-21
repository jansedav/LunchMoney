import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import '../Style/Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    localStorage.setItem('Token', '');
  }

  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand id="app-title" href="/">Lunch Money <i className="fas fa-utensils"></i> </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="items" href="/Inventory">Inventory</Nav.Link>
            <Nav.Link className="items" href="/Dishes">Dishes</Nav.Link>
          </Nav>
          <Nav>
          <Navbar.Brand>Welcome {localStorage.getItem('User')}!</Navbar.Brand>
          <Nav.Link onClick={this.handleLogout} href="/" className="account" > Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;