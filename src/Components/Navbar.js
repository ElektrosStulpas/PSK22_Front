import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="home_logo">
                <h1 >
                    <Link to="/">RenTool</Link>
                </h1>
            </div>
            <div className="links">
                <Link to="/login">
                    <button type="button">
                        Log in
                    </button>
                </Link>
                <Link to="/signup">
                    <button type="button">
                        Sign up
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;