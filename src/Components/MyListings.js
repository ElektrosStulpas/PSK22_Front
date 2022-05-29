import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Table, Button } from "react-bootstrap";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const MyListings = () => {

    const [listings, setListings] = useState([])

    const getMyListings = () => {
        return axios.get(API_URL + "mine", { headers: authHeader() })
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

    const hideListing = (listing, hideFlag) => {
        axios.patch(API_URL + listing.listingId + "/hidden", {
            hidden: hideFlag
        }, { headers: authHeader() })
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
            <h2 style={{ textAlign: 'left' }}>Active listings</h2>
            <ListingTable listings={listings} deleteListing={deleteListing} hideListing={hideListing} listingHideState={false} />
            <h2 style={{ textAlign: 'left' }}>Hidden listings</h2>
            <ListingTable listings={listings} deleteListing={deleteListing} hideListing={hideListing} listingHideState={true} />
        </div>
    )
}

const ListingTable = (props) => {
    const listings = props.listings
    const deleteListing = props.deleteListing
    const hideListing = props.hideListing
    const listingHideState = props.listingHideState

    var navigate = useNavigate();

    return (
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
                        if (listing.hidden === listingHideState)
                            return listing;
                    }).map(listing =>
                        <tr key={listing.id}>
                            <td key={listing.id}>{listing.title}</td>
                            <td key={listing.id}>{listing.city}</td>
                            <td key={listing.id}>{listing.description}</td>
                            <td key={listing.id}><Button variant="primary" onClick={() => { navigate('/edit-listing', { state: listing }) }}> Edit </Button></td>
                            <td key={listing.id}><Button variant="secondary" onClick={() => { deleteListing(listing) }}> Delete </Button></td>
                            <td key={listing.id}>
                                <Button variant="secondary" onClick={() => { hideListing(listing, !listing.hidden) }}>
                                    {listing.hidden ? "Unhide" : "Hide"}
                                </Button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </Table>
    )
}

export default MyListings;