import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { UserContext } from "../services/UserContext";

const Navbar = () => {
    const { user, login, logout } = useContext(UserContext);
    return (
        <nav className="navbar">
            <div className="home_logo">
                <h1 >
                    <Link to="/">RenTool</Link>
                </h1>
            </div>
            {user ? (
                <div className="navbar-nav ml-auto">
                    <Link to="/profile">
                        <button type="button">
                            Profile
                        </button>
                    </Link>
                    <Link to="/login">
                        <button type="button" onClick={() => AuthService.logout(logout)}>
                            Log out
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                    <Link to="/login">
                        <button type="button">
                            Log in
                        </button>
                    </Link>
                    <Link to="/register">
                        <button type="button">
                            Register
                        </button>
                    </Link>
                </div>
            )
            }
        </nav >
    )
}

export default Navbar;