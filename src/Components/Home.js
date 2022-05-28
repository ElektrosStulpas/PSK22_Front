import React, { useEffect, useState } from "react";

import {Button,Card,Container,Row,Col,Form, Dropdown, DropdownButton, Modal, ModalDialog, ModalBody} from 'react-bootstrap'; // eslint-disable-line
import { ListingCard } from "./ListingCard";


const Home = () => {
    const [listings, setListing] = useState([])
    const [query, setQuery] = useState("")
    const [cities, setCities] = useState([])
    const [sorting, setSortType] = useState("data");

    const [days, setDays] = useState(1)

    const [dropdownValue, setDropdown] = useState("Select a city")

    const [city, setCity] = useState("")
    const [ price, setPrice ] = useState("");

    const [show, setShow] = useState(false);
    const handleApply = () => {
        setShow(false);
        fetchFilter(city+"&"+price.substring(1))

    }
    const handleShow = () => {
        setShow(true);
        setOnce(true)
    }
    const handleClose = () => setShow(false);

    const [once, setOnce] = useState(false);


    var fetchSort =  async (fetchWhat) => {
        let url = `https://gariunaicloud.azurewebsites.net/api/Listings`
        if (sorting != "data") {
            url = `https://gariunaicloud.azurewebsites.net/api/Listings?SortOrder=${fetchWhat}` 
            if (city) {
                url = url+ `${city}&${price.substring(1)} `
            }
        }
        await fetch(url)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setListing(data)
          })
    }

    const fetchFilter =  async (filterQuery) => {
        var url = `https://gariunaicloud.azurewebsites.net/api/Listings${filterQuery}`
        if(sorting != "data") {
            url = `https://gariunaicloud.azurewebsites.net/api/Listings${filterQuery}&SortOrder=${sorting}`
        }
        if(filterQuery == "basic") {
            url = "https://gariunaicloud.azurewebsites.net/api/Listings"
        }
        await fetch(url)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setListing(data)
          })
    }


    useEffect(() => {
        const sortData = async type => {
            await fetchSort(type)
        }

        sortData(sorting).catch(console.error);
    }, [sorting])

    useEffect(() => {
        if(once == true) {
        var cities1 = []
        listings.forEach(ele => {
            cities1.push(ele.city)
        })
        cities1 = [...new Set(cities1)];
        cities1 = cities1.filter(function(e){return e}); 
        cities1 = cities1.sort()
        setCities(cities1)
    }
    }, [once])


    const handleInput = (e)=>{
        setPrice(`?MaxPrice=${e.target.value}`);
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

    const handleCitySelect=(e)=> {
        setDropdown(e)
        if(e != "Select an Item") {setCity(`?City=${e}`)}
    }

    const handleReset=()=> {
        fetchFilter("basic")
        setDropdown("Select an Item")
        setPrice("")
        setShow(false);
    }

    const handleDays=(e)=> {
        setDays(e.target.value);
    }

    const sort = 
        <Dropdown>
        <DropdownButton title="Sort by" variant="success" onSelect={handleSelect}>
            <Dropdown.Item  eventKey="PriceAsc" href="">Price ascending</Dropdown.Item>
            <Dropdown.Item eventKey="PriceDesc" href="">Price descending</Dropdown.Item>
            <Dropdown.Item eventKey="NameAsc" href="">Name ascending</Dropdown.Item>
            <Dropdown.Item eventKey="NameDesc" href="">Name descending</Dropdown.Item>
        </DropdownButton>
        </Dropdown>

    const filter = 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Price max: { price.substring(10) }</h3>
                <input type="number" onInput={ handleInput } />
                <h3>Cities: </h3> 
                {cities.length > 0 && (
                    <div>
                        <Dropdown>
                        <DropdownButton className="dropdownFilter" title={dropdownValue} variant="success" onSelect={handleCitySelect}>
                        <Dropdown.Item eventKey={"Select an Item"} > Select an Item </Dropdown.Item>
                        {cities.map((city,index) => (
                        <Dropdown.Item eventKey={city} key={index}> {city} </Dropdown.Item>
                    ))}
                    </DropdownButton>
                    </Dropdown>
                    </div>
                )}
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleReset}>
                Reset Filter
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleApply}>
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
                <Button  className="justify-content-end" variant="success" onClick={handleShow}>Filter</Button>
            </Col>
            <div className="daysToRent">Days to rent: <input type="number" min="1" onInput={handleDays} style={{"width":"80px"}}></input> </div> 
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
                                <ListingCard listing={listing}  days={days} />
                            </Col>
                        )}
                    </Row>
                )}
            </div>
        </Container>
    )
}

export default Home;