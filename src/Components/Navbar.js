import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Navbar, Nav, Container } from 'react-bootstrap'


const NavigationBar = () => {

    useNavigate()

    const logOut = () => {
        AuthService.logout()
        Navigate("/")
    }

    return (
        <Navbar bg="white" expand="lg" className="pb-0 pt-0">
            <Container>
                <Navbar.Brand as={Link} to="/" className="ms-auto">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="RenTool" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {AuthService.isAuthenticated() ?
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/my-listings">My listings</Nav.Link>
                            <Nav.Link as={Link} to="/create-listing">Create a listing</Nav.Link>
                            <Nav.Link as={Link} to="/order-history">Order history</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={() => logOut()}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                            <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    )
}

export default NavigationBar;