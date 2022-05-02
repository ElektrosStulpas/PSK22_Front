import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import PicUpload from './PicUpload';
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
    }

    var otherState = {
        startDate: '',
        endDate: '',
        pic: null
    }

    const [state, setState] = useState(listingState);
    const [tempState, setTempState] = useState(otherState);

    var navigate = useNavigate();

    var handleChange = (name, value) => {

        //TODO possible to do input validation here?
        setState({
            ...state,
            [name]: value,
        })
    }

    var handleTempChange = (name, value) => {

        setTempState({
            ...state,
            [name]: value,
        })
    }

    const registerListing = () => {
        return axios.post(API_URL, state, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                return response
            });
    }

    var handleSubmit = () => {
        registerListing().then(
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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        setTempState({
            ...state,
            startDate: start.toJSON(),
            endDate: end === null ? null : end.toJSON(),
        })
    };

    return (
        <div className='createListingForm'>
            <h1>Listing creation</h1>
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
                <label htmlFor="datepicker">Pick availability frame:</label>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
                <input type="button" value="Create the listing" onClick={handleSubmit} />
            </form>
            <button onClick={() => { navigate('/') }}>Cancel</button>
            <PicUpload currentState={[tempState, setTempState]} handleChange={handleTempChange} />
        </div>
    )
}

export default CreateListing;