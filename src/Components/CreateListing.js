import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import PicUpload from './PicUpload';

const CreateListing = () => {
    var initialState = {
        listingId: 0,
        ownerUsername: '',
        title: '',
        price: '',
        city: '',
        collateral: '',
        phone: '',
        email: '',
        description: '',
        startDate: '',
        endDate: '',
        pic: null
    }

    const [state, setState] = useState(initialState);

    var navigate = useNavigate();

    var handleChange = (name, value) => {
        // const {name, value} = event.target

        //TODO possible to do input validation here?
        setState({
            ...state,
            [name]: value,
        })
    }

    async function postData(url = '', data) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: data
        });
    
        if(response.status === 200)
        {
            // locationUrl = response.headers.get('Location');
            // locationUrl = locationUrl.replace('http', 'https');
            return response.json(); // parses JSON response into native JavaScript objects
        }
        else
        {
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
                <label htmlFor="price">Price/day</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    value={state.price}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={state.city}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="collateral">Collateral</label>
                <input
                    type="text"
                    name="collateral"
                    id="collateral"
                    value={state.collateral}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={state.phone}
                    onChange={(event) => handleChange(event.target.name, event.target.value)} />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={state.email}
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
                <input type="button" value="Create the listing" onClick={handleSubmit}/>
            </form>
            <button onClick={() => {navigate('/')}}>Cancel</button>
            <PicUpload currentState={[state, setState]} handleChange={handleChange}/>
        </div>
    )
}

export default CreateListing;