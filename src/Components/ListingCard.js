import axios from "axios";
import React, { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col, Form, Pagination } from 'react-bootstrap';

export const ListingCard = (listing) => {
    const loadingGif = process.env.PUBLIC_URL + '/loading.gif'
    const defaultImage = process.env.PUBLIC_URL + '/no_image.png'
    const realImageUrl = `http://gariunaicloud.azurewebsites.net/api/Listings/${listing.listingId}/image`
    const [imageUrl, setImageUrl] = useState(loadingGif)
    const days = 5

    const checkImage = () => {
        axios
            .get(realImageUrl)
            .then(_ => setImageUrl(realImageUrl), _ => setImageUrl(defaultImage))
    }

    useEffect(() => {
        checkImage()
    }, [])

    function calcPrice(dayPrice, days) {
        return dayPrice * days
    }

    return (
        <Card style={{ width: '18rem', height: '100%' }}>
            <Card.Body className="d-flex flex-column">
                <Card.Title style={{ textAlign: 'center' }}>{listing.title}</Card.Title>
                <Card.Img style={{ 'objectFit': 'scale-down', 'height': '15rem' }} variant="top" src={imageUrl} />
                {/* <Card.Text disabled>{listing.description}</Card.Text> */}
                <Card.Subtitle className="mb-3 daysPrice" >{listing.daysPrice}€ / day</Card.Subtitle>
                <Card.Subtitle className="mb-3 totalPrice" >Total: {calcPrice(listing.daysPrice, days).toFixed(2)}€</Card.Subtitle> 
                <Card.Subtitle className="mb-0 city">City: {listing.city}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}
