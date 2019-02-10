import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';


class Navigation extends Component {
    render(){
        return(
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        Github Searcher
                    </Navbar.Brand>
                <Nav>
                    <Nav.Link href="#">
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Navigation;