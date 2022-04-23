import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const CreateListing = () => {
    var initialState = {
        title: '',
        price: '',
        city: '',
        collateral: '',
        phone: '',
        email: '',
        description: '',
        startDate: new Date(),
        endDate: null,
    }

    const [state, setState] = useState(initialState);

    var navigate = useNavigate();

    var handleChange = (event) => {
        const {name, value} = event.target

        //TODO possible to do input validation here?
        setState({
            ...state,
            [name]: value,
        })
    }

    var handleSubmit = () => {
        // TODO api POST handling here
        navigate("/")
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
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
                    onChange={handleChange} />
                <label htmlFor="price">Price/day</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    value={state.price}
                    onChange={handleChange} />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={state.city}
                    onChange={handleChange} />
                <label htmlFor="collateral">Collateral</label>
                <input
                    type="text"
                    name="collateral"
                    id="collateral"
                    value={state.collateral}
                    onChange={handleChange} />
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={state.phone}
                    onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={state.email}
                    onChange={handleChange} />
                <label htmlFor="description">Description</label>
                <input
                    type="textarea"
                    name="description"
                    id="description"
                    value={state.description}
                    onChange={handleChange} />
                <label htmlFor="datepicker">Pick availability frame:</label>
                <DatePicker
                    name="datepicker"
                    selected={state.startDate}
                    onChange={handleChange}
                    startDate={state.startDate}
                    endDate={state.endDate}
                    selectsRange
                    inline
                />
                <input type="button" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default CreateListing;