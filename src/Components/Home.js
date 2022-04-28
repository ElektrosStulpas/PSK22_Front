import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Home = () => {
    const [listings, setListing] = useState([])

    const fetchData = () => {
        fetch("https://gariunaicloud.azurewebsites.net/api/Listings")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setListing(data)
          })
      }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className="home">
            <h1>RenTool homepage</h1>
            <Link to="/create-listing">
                <Button variant="primary" >
                    Create listing
                </Button>
            </Link>
                <Container>
                {listings.length > 0 && (
                    <Row xs={2} md={4}>
                        {listings.map(listing => (
                            <Col key={listing.listingId} style={{marginBottom:'10px'}}>
                                <Card style={{ width: '18rem',height:'100%'}}>
                                <Card.Img variant="top" src="https://via.placeholder.com/200x200" />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{listing.title}</Card.Title>
                                    <Card.Subtitle className="mb-2">Price: {listing.daysPrice}€</Card.Subtitle>
                                    <Card.Subtitle classname="mb-2">City: {listing.city}</Card.Subtitle>
                                    <Card.Text>
                                    {listing.description}
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Open listing</Button>
                                </Card.Body>
                                </Card>
                            </Col> 
                        ))}
                    </Row>
                    
                )}
                </Container>
        </div>
    )
}

export default Home;