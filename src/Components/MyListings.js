import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Table } from "react-bootstrap";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const MyListings = () => {

    const [listings, setListings] = useState([])

    var navigate = useNavigate();
    // const getMyListings = () => {
    //     fetch("https://gariunaicloud.azurewebsites.net/api/Listings")
    //         .then(response => {
    //             console.log(response.json())
    //             return response.json()
    //         })
    //         .then(data => {
    //             console.log(data)
    //             setListing(data)
    //         })
    // }

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
                            if (listing.ownerUsername === 'tautvilis')
                                return listing;
                        }).map(listing =>
                            <tr key={listing.id}>
                                <td key={listing.id}>{listing.title}</td>
                                <td key={listing.id}>{listing.city}</td>
                                <td key={listing.id}>{listing.description}</td>
                                <button onClick={() => { navigate('/edit-listing', { state: listing }) }}>Edit</button>
                            </tr>)
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default MyListings;