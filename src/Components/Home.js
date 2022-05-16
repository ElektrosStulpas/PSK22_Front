import React, { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { ListingCard } from "./ListingCard"

const Home = () => {
    const [listings, setListing] = useState([])
    const [query, setQuery] = useState("")
    const [cities, setCities] = useState([])
    const [sorting, setSortType] = useState("data");

    const [city, setCity] = useState("")
    const [ price, setPrice ] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShowxw(true);

    var days = 5

    const applyFilter = async (fetchWhat) => {
        setShow(false)
        await fetchFilter(fetchWhat)
    }


    var fetchSort =  async (fetchWhat) => {
        const types = {
            data: 'https://gariunaicloud.azurewebsites.net/api/Listings',
            name_desc: 'https://gariunaicloud.azurewebsites.net/api/Listings?SortOrder=NameDesc',
            name_asc: 'https://gariunaicloud.azurewebsites.net/api/Listings?SortOrder=NameAsc',
            price_asc: 'https://gariunaicloud.azurewebsites.net/api/Listings?SortOrder=PriceAsc',
            price_desc: 'https://gariunaicloud.azurewebsites.net/api/Listings?SortOrder=PriceDesc'
        };
        await fetch(types[fetchWhat])
          .then(response => {
            return response.json()
          })
          .then(data => {
            setListing(data)
          })
    }

    const fetchFilter =  async (filterQuery) => {
        console.log(filterQuery)
        await fetch(`https://gariunaicloud.azurewebsites.net/api/Listings?${filterQuery}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setListing(data)
          })
    }


    useEffect(() => {
        const sortData = async type => {
            const types = {
                data: 'data',
                titleAsc: 'name_asc',
                daysPriceAsc: 'price_asc',
                titleDesc: 'name_desc',
                daysPriceDesc: 'price_desc'
            };
            await fetchSort(types[type])
        }
        var cities1 = []
        ofData.forEach(ele => {
            cities1.push(ele.city)
        })
        cities1 = [...new Set(cities1)];
        cities1 = cities1.filter(function(e){return e}); 
        setCities(cities1)
        sortData(sorting).catch(console.error);
    }, [sorting])


    const handleInput = (e)=>{
        setPrice( e.target.value );
      }

    const form = 
        <Form>
            <Form.Group className="w-50 mx-auto py-2" controlId="search">
            <Form.Control type="string" onChange={event => setQuery(event.target.value)} placeholder="Search for anything" />
            </Form.Group>
        </Form>

    const handleSelect=(e)=>{
    setSortType(e)
    }

    const sort = 
        <Dropdown>
        <DropdownButton title="Sort by" variant="success" onSelect={handleSelect}>
            <Dropdown.Item  eventKey="daysPriceAsc" href="">Price ascending</Dropdown.Item>
            <Dropdown.Item eventKey="daysPriceDesc" href="">Price descending</Dropdown.Item>
            <Dropdown.Item eventKey="titleAsc" href="">Name ascending</Dropdown.Item>
            <Dropdown.Item eventKey="titleDesc" href="">Name descending</Dropdown.Item>
        </DropdownButton>
        </Dropdown>

    const filter = 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Price max: { price }</h3>
                <input type="number" onInput={ handleInput } />
                <h3>Cities: </h3> 
                {cities.length > 0 && (
                    <div>
                        {cities.map((city,index) => (
                        <ul>
                        <input type="checkbox" key={index}/> {city}
                        </ul>
                    ))}
                    </div>
                )}
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={applyFilter("yes")}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Apply Filter
            </Button>
            </Modal.Footer>
        </Modal>

    return (
        <Container>
        <div className="home">
            {filter}
            <h1 style={{textAlign:'center'}}>Listings</h1>
            <Row>
            <Col sm={2}>{sort}</Col>
            <Col sm={8}>{form}</Col>
            <Col sm={2} >
                <Button variant="success" onClick={handleShow}>Filter</Button>
            </Col>
            </Row>
                {listings.length > 0 && (
                    <Row xs={2} md={4}>
                        {listings.filter(listing => { // eslint-disable-line
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