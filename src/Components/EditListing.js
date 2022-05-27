import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingForm from './ListingForm';
import authHeader from "../services/auth-header";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const EditListing = () => {

    const location = useLocation();
    const [image, setImage] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [listingState, setListingState] = useState(location.state)
    const [conflictingState, setConflictingState] = useState(null)

    const navigate = useNavigate();

    const updateListing = (payload) => {
        return axios.put(API_URL + location.state.listingId, payload, { headers: authHeader() })
    }

    const updateListingImage = (listingId, image) => {
        const formData = new FormData()
        formData.append("file", image)
        return axios.put(API_URL + `${listingId}/image`, formData, { headers: authHeader() });
    }

    const getCurrentListing = () => {
        return axios.get(API_URL + listingState.listingId, { headers: authHeader() })
    }

    const handleSubmit = (formData) => {
        const listing = {
            ...listingState,
            title: formData.title.value,
            daysPrice: formData.daysPrice.value,
            city: formData.city.value,
            deposit: formData.deposit.value,
            description: formData.description.value,
        }

        updateListing(listing)
            .then(() => {
                if(image)
                    updateListingImage(location.state.listingId, image)
            })
            .then(() => {
                navigate("/")
            })
            .catch(error => {
                if (error.response.status === 409) {
                    //Concurrency error (eTag missmatch)
                    getCurrentListing()
                        .then(response => {
                            setListingState({
                                ...listing,
                                eTag: response.data.eTag, 
                            })
                            setConflictingState(response.data)
                        })
                    setErrorMessage("Oops, it seems that this listing has been modified in another session. Press update to overwrite")
                } else {
                    setErrorMessage("Editing failed with error: " + error.text)
                }
            })
    }

    return (
        <div className='listing-form-container'>
            <h1>Update listing</h1>
            <ListingForm handleSubmit={handleSubmit} imageState={[image, setImage]} listingState={listingState} editing={true} conflictingListing={conflictingState}/>
            <p className='text-danger'>{errorMessage}</p>
        </div>
    )
}

export default EditListing;