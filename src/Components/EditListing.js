import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Listings/';

const EditListing = () => {

    const location = useLocation();
    const [state, setState] = useState(location.state);

    var navigate = useNavigate();

    var handleChange = (name, value) => {

        //TODO possible to do input validation here?
        setState({
            ...state,
            [name]: value,
        })
    }

    const updateListing = () => {
        return axios.put(API_URL + state.listingId, state, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                return response
            });
    }

    var handleSubmit = () => {
        updateListing().then(
            (response) => {
                console.log(response.data)
                navigate("/")
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage)
            }
        )
    }

    return (
        <div className='editListingForm'>
            <h1>Editing listing</h1>
            <form>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={state.title}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="daysPrice">Price/day</label>
                <input
                    type="number"
                    name="daysPrice"
                    id="daysPrice"
                    value={state.daysPrice}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={state.city}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="deposit">Deposit</label>
                <input
                    type="number"
                    name="deposit"
                    id="deposit"
                    value={state.deposit}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={state.description}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <input type="button" value="Save changes" onClick={handleSubmit} />
            </form>
            <button onClick={() => { navigate('/') }}>Cancel</button>
        </div>
    )
}

export default EditListing;