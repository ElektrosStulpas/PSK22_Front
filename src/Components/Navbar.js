import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { UserContext } from "../services/UserContext";

import {Navbar, Nav, Container} from 'react-bootstrap'


const navbar = () => {
    const { user, login, logout } = useContext(UserContext);

    return (
        <Navbar bg="white" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="ms-auto">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="RenTool"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/create-listing">Create a listing</Nav.Link>
                </Nav>
                <Nav className="me-1">
                    <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                    <Nav.Link as={Link} to="/signup" onClick={() => AuthService.logout(logout)}>Sign up</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navbar;