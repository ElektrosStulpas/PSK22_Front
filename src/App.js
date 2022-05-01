import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateListing from "./Components/CreateListing";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {

    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/create-listing"
                        element={<CreateListing />} />
                    <Route
                        path="/login"
                        element={<Login />} />
                    <Route
                        path="/register"
                        element={<Register />} />
                </Routes>
            </div>
        </div>
    )
}

export default App