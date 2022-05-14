import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import authHeader from "../services/auth-header";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const CreateListing = () => {
    var listingState = {
        title: '',
        daysPrice: 0,
        city: '',
        deposit: 0,
        description: '',
        image: null
    }

    const [state, setState] = useState(listingState);

    var navigate = useNavigate();

    var handleChange = (name, value) => {
        console.log(name, value)
        setState({
            ...state,
            [name]: value,
        })
    }

    const registerListing = () => {
        var payload = {
            title: state.title,
            daysPrice: state.daysPrice,
            city: state.city,
            deposit: state.deposit,
            description: state.description,
        }
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

    var handleSubmit = () => {
        registerListing()
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
            //image uploading will fail silently px yr
            .then(newListingId => {
                if (state.image != null) {
                    return updateListingImage(newListingId, state.image)
                }
            })
            .then(_ => navigate("/"))
    }

    const imagePreview = () => {
        return state.image ? <img src={URL.createObjectURL(state.image)} /> : <div />
    }

    return (

        <div className="new-listing-form-container">
            <h1>Create new listing</h1>
            <form class='new-listing-form' onSubmit={e => {e.preventDefault(); handleSubmit()}}>

                <div className="form-element">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={state.title}
                        required
                        onChange={(event) => handleChange(event.target.name, event.target.value)} />
                </div>

                <div className="form-element">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={state.city}
                        onChange={(event) => handleChange(event.target.name, event.target.value)} />
                </div>

                <div className="form-element">
                    <label htmlFor="daysPrice">Price/day</label>
                    <input
                        type="number"
                        name="daysPrice"
                        id="daysPrice"
                        required
                        value={state.daysPrice}
                        onChange={(event) => handleChange(event.target.name, event.target.value)} />
                </div>

                <div className="form-element">
                    <label htmlFor="deposit">Deposit</label>
                    <input
                        type="number"
                        name="deposit"
                        id="deposit"
                        required
                        value={state.deposit}
                        onChange={(event) => handleChange(event.target.name, event.target.value)} />

                </div>

                <div className="form-element">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={state.description}
                        onChange={(event) => handleChange(event.target.name, event.target.value)} />
                </div>

                <div className="form-element">
                    <label htmlFor='image'>Picture</label>
                    <input
                        nameid="image"
                        id="image"
                        type="file"
                        onChange={(event) => {
                            handleChange("image", event.target.files[0])
                        }} />
                    {imagePreview()}
                </div>

                <div class="form-element">
                    <input type="submit" value="Create the listing"/>
                </div>

            </form>
            <button onClick={() => { navigate('/') }}>Cancel</button>

        </div>
    )
}

export default CreateListing;