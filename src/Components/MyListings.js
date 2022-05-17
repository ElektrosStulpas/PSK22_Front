import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Table, Button } from "react-bootstrap";
import { UserContext } from "../services/UserContext";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const MyListings = () => {

    const { userGlobalState, login, logout } = useContext(UserContext);

    const [listings, setListings] = useState([])

    var navigate = useNavigate();

    const getMyListings = () => {
        return axios.get(API_URL, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                setListings(response.data)
                return response
            });
    }

    useEffect(() => {
        getMyListings()
    }, [])

    const deleteListing = (listing) => {
        axios.delete(API_URL + listing.listingId, { headers: authHeader() })
            .then(() => { getMyListings() },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage)
                })
    }

    return (
        <div className="mylistings">
            <h1 style={{ textAlign: 'center' }}>My listings</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>City</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.length > 0 && (
                        listings.filter(listing => {
                            if (listing.ownerUsername === userGlobalState.userName)
                                return listing;
                        }).map(listing =>
                            <tr key={listing.id}>
                                <td key={listing.id}>{listing.title}</td>
                                <td key={listing.id}>{listing.city}</td>
                                <td key={listing.id}>{listing.description}</td>
                                <Button variant="primary" onClick={() => { navigate('/edit-listing', { state: listing }) }}> Edit </Button>
                                <Button variant="secondary" onClick={() => { deleteListing(listing) }}> Delete </Button>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default MyListings;