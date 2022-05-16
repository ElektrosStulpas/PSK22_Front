import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingForm from './ListingForm';
import authHeader from "../services/auth-header";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const EditListing = () => {

    const location = useLocation();
    const [image, setImage] = useState(null)

    var navigate = useNavigate();

    const updateListing = (payload) => {
        return axios.put(API_URL + location.state.listingId, payload, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                return response
            });
    }

    const updateListingImage = (listingId, image) => {
        const formData = new FormData()
        formData.append("file", image)
        return axios.put(API_URL + `${listingId}/image`, formData, { headers: authHeader() });
    }

    var handleSubmit = (formData) => {
        var listing = {
            title: formData.title.value,
            daysPrice: formData.daysPrice.value,
            city: formData.city.value,
            deposit: formData.deposit.value,
            description: formData.description.value,
        }
        updateListing(listing)
            .then(response => response.data)
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage)
            })
            .then(() => {
                updateListingImage(location.state.listingId, image)
            })
            .then(_ => navigate("/"))
    }

    return (
        <div className='edit-listing-form-container'>
            <h1>Editing listing</h1>
            <ListingForm handleSubmit={handleSubmit} imageState={[image, setImage]} listingState={location.state} />
        </div>
    )
}

export default EditListing;