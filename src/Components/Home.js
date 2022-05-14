import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { ListingCard } from "./ListingCard"

const Home = () => {
    const [listings, setListing] = useState([])
    const [query, setQuery] = useState("")

    var days = 5

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

    const form =
        <Form>
            <Form.Group className="w-50 mx-auto py-2" controlId="search">
                <Form.Control type="string" onChange={event => setQuery(event.target.value)} placeholder="Search for anything" />
            </Form.Group>
        </Form>

    return (
        <Container>
            <div className="home">
                <h1 style={{ textAlign: 'center' }}>Listings</h1>
                {form}

                {listings.length > 0 && (
                    <Row xs={2} md={4}>
                        {listings.filter(listing => {
                            if (query === '') {
                                return listing;
                            } else if (listing.title.toLowerCase().includes(query.toLowerCase())) {
                                return listing;
                            }
                        }).map(listing =>
                            <Col key={listing.listingId} style={{ marginBottom: '10px' }}>
                                <ListingCard {...listing} />
                            </Col>
                        )}
                    </Row>

                )}
            </div>
        </Container>
    )
}

export default Home;