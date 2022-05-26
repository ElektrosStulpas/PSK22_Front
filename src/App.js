import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import NavigationBar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateListing from "./Components/CreateListing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";

const App = () => {

    return (
        <div className="App">
            <NavigationBar />
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
                    <Route
                        path="/Profile"
                        element={<Profile />} />
                </Routes>
            </div>
        </div>
    )
}

export default App