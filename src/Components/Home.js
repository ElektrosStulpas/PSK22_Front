import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>RenTool homepage</h1>
            <Link to="/create-listing">
                <button type="button">
                    Create listing
                </button>
            </Link>
        </div>
    )
}

export default Home;