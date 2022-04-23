import React, { Component } from "react";
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateListing from "./Components/CreateListing";

class App extends Component {
    render () {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create-listing" element={<CreateListing />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App