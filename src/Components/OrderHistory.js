import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import moment from 'moment';

import { Tabs, Tab, TabContainer, TabPane, ButtonGroup } from 'react-bootstrap/'
import { Button, Card, Container, Row, Col, Form, Dropdown, DropdownButton, Modal, ModalDialog, ModalBody, ListGroup, ListGroupItem } from 'react-bootstrap'; // eslint-disable-line

import AuthService from '../services/auth.service';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([])
    const [listingHistory, setListingHistory] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [isReady, setReady] = useState(false)


    const fetchOptions = {
        headers: new Headers({ 'Authorization': 'bearer ' + AuthService.getCurrentUser() })
    }

    const approveOrder = (id, status) => {
        fetch(`https://gariunaicloud.azurewebsites.net/api/Orders/${id}/status?status=${status}&force=True`, {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + AuthService.getCurrentUser()
            }
        }).then(response => {
            return response.json();
        })
            .then(data => {
                fetchOrderHistory("listingHistory")
            })
    }

    const fetchOrderHistory = async (which) => {
        const types = {
            orderHistory: 'https://gariunaicloud.azurewebsites.net/api/Orders/placed',
            listingHistory: 'https://gariunaicloud.azurewebsites.net/api/Orders/received'
        };
        fetch(types[which], fetchOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.forEach(async element => {
                    await fetch("https://gariunaicloud.azurewebsites.net/api/Listings/" + element.listingId)
                        .then(response => {
                            return response.json()
                        })
                        .then(data => {
                            element['listing'] = data
                        })
                })
                setTimeout(() => {
                    if (which == "orderHistory") {
                        setOrderHistory(data)
                        console.log(data)
                        setReady(true)
                    } else {
                        setListingHistory(data)
                        console.log(data)
                        setReady(true)
                    }
                }, 600);

            })
    }

    const handleHistory = async (which) => {
        await fetchOrderHistory(which)
    }

    useEffect(() => {
        if (!isPageLoaded) {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {

    }, [listingHistory])

    useEffect(() => {
        const getData = async () => {
            await fetchOrderHistory("orderHistory")
        }
        if (isLoaded) {
            setIsPageLoaded(true);
            getData()
        }
    }, [isLoaded]);


    const tabMenu =
        <Tabs
            defaultActiveKey="orderHistory"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            onSelect={handleHistory}
            mountOnEnter="true"
            unmountOnExit="true"
        >
            <Tab eventKey="orderHistory" title="Placed orders" >
                {orderHistory.length > 0 && (
                    <ListGroup>
                        {orderHistory.map(order => (
                            <ListGroup.Item key={order.id} >
                                Date: {moment(order.startDate).format("YYYY/M/D, h:mm:ss")} - {moment(order.endDate).format("YYYY/M/D, h:mm:ss ")}
                                | Item: {order.listing.title} | Price: {order.price} | Status: {order.status}</ListGroup.Item>

                        ))}
                    </ListGroup>

                )}

            </Tab>
            <Tab eventKey="listingHistory" title="Received orders">
                {listingHistory.length > 0 && (
                    <ListGroup>
                        {listingHistory.map(order => (
                            <div>
                                {!order || !order.listing ? <div>"Loading data"</div> :
                                    <ListGroup.Item key={order?.orderId} className="d-flex justify-content-between align-items-center">
                                        Status: {order.status} | Item: {order.listing.title} | Price: {order.price} | Placer Name: {order.placerUsername}
                                        <ButtonGroup onSelect={approveOrder} >
                                            <Button variant="success" onClick={() => { approveOrder(order?.orderId, "Confirmed") }}>Approve</Button>
                                            <Button variant="danger" onClick={() => { approveOrder(order?.orderId, "Cancelled") }} >Cancel</Button>
                                            <Button variant="primary" onClick={() => { approveOrder(order?.orderId, "Completed") }} >Complete</Button>
                                        </ButtonGroup>
                                    </ListGroup.Item>
                                }
                            </div>
                        ))}
                    </ListGroup>
                )}
            </Tab>
        </Tabs>

    return (
        <Container>
            <h1 className="mt-3">Order History</h1>
            <div>
                {tabMenu}
            </div>
        </Container>
    )
}

export default OrderHistory