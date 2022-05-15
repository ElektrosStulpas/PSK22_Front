import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Form, Button, Image } from 'react-bootstrap';
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

    const imagePreview = () => {
        return image ? <Image src={URL.createObjectURL(image)} className='img-fluid mx-auto d-block' style={{ "max-height": "18rem" }} /> : <div />
    }

    return (
        //should probably move this form to separate component and reuse in edit listing
        <div className='new-listing-form-container'>
            <h1>Create new listing</h1>
            <Form onSubmit={e => {e.preventDefault(); handleSubmit(e.target)}}>
                <Form.Group className="mb-1">
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control
                        name="title"
                        id="title"
                        required/>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="city">City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        id="city"
                        required/>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="daysPrice">Price/day</Form.Label>
                    <Form.Control
                        type="number"
                        name="daysPrice"
                        id="daysPrice"
                        required/>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="deposit">Deposit</Form.Label>
                    <Form.Control
                        type="number"
                        name="deposit"
                        id="deposit"
                        required/>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        name="description"
                        id="description"
                        as = "textarea"
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor='image'>Picture</Form.Label>
                    <Form.Control className="mb-3"
                        nameid="image"
                        id="image"
                        type="file"
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }} />
                    {imagePreview()}
                </Form.Group>

                <div className='d-grid gap-2'>
                    <Button variant="primary" type="submit"> Create </Button>
                    {' '}
                    <Button variant="secondary" onClick={() => { navigate('/') }}> Cancel </Button>
                </div>

            </Form>
        </div>
    )
}

export default CreateListing;