import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import NavigationBar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateListing from "./Components/CreateListing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import EditListing from "./Components/EditListing";
import MyListings from "./Components/MyListings";
import OrderHistory from "./Components/OrderHistory";
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
                        path="/edit-listing"
                        element={<EditListing />} />
                    <Route
                        path="/my-listings"
                        element={<MyListings />} />
                    <Route
                        path="/order-history"
                        element={<OrderHistory />} />
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