import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import PicUpload from './PicUpload';

const CreateListing = () => {
    var initialState = {
        // listingId: 0,
        // ownerUsername: '', // instead of this get auth header
        title: '',
        daysPrice: '',
        city: '',
        deposit: '',
        description: '',
        startDate: '',
        endDate: '',
        pic: null
    }

    const [state, setState] = useState(initialState);

    var navigate = useNavigate();

    var handleChange = (name, value) => {

        //TODO possible to do input validation here?
        setState({
            ...state,
            [name]: value,
        })
    }

    async function postData(url = '', data) {
        // add auth header to headers of fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (response.status === 200) {
            // locationUrl = response.headers.get('Location');
            // locationUrl = locationUrl.replace('http', 'https');
            return response.json(); // parses JSON response into native JavaScript objects
        }
        else {
            throw new Error("Something went wrong when sending POST request. Status got: " + response.status);
        }
    }

    var handleSubmit = () => {
        // postData('https://gariunaicloud.azurewebsites.net/api/Listings', JSON.stringify(state))
        //         .then(response => {
        //         console.log(response);
        //         }).catch(error => {
        //             console.error(error);
        //         });
        navigate("/")
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        setState({
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
                    type="text"
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
                    type="text"
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
            <PicUpload currentState={[state, setState]} handleChange={handleChange} />
        </div>
    )
}

export default CreateListing;