import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Form, Button, Image } from 'react-bootstrap';
import ListingForm from './ListingForm';
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const CreateListing = () => {
    const [image, setImage] = useState(null)

    var navigate = useNavigate();

    const registerListing = (payload) => {
        return axios.post(API_URL, payload, { headers: authHeader() })
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
        var newListing = {
            title: formData.title.value,
            daysPrice: formData.daysPrice.value,
            city: formData.city.value,
            deposit: formData.deposit.value,
            description: formData.description.value,
        }
        registerListing(newListing)
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
            .then(newListingId => {
                if (image != null) {
                    return updateListingImage(newListingId, image)
                }
            })
            .then(_ => navigate("/"))
    }

    return (
        <div className='center-container'>
            <h1>Create new listing</h1>
            <ListingForm handleSubmit={handleSubmit} imageState={[image, setImage]} />
        </div>
    )
}

export default CreateListing;