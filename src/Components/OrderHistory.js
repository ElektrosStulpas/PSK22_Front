import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../services/UserContext";

import {Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap/'
import {Button,Card,Container,Row,Col,Form, Dropdown, DropdownButton, Modal, ModalDialog, ModalBody, ListGroup, ListGroupItem} from 'react-bootstrap'; // eslint-disable-line

import AuthService from '../services/auth.service';

const OrderHistory = () => {
    const { user, login, logout } = useContext(UserContext);
    const [orderHistory, setOrderHistory] = useState([])
    const [listingHistory, setListingHistory] = useState([])


    const [listings, setListing] = useState([])

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); 


    const fetchOptions = {
        headers: new Headers({'Authorization':'bearer '+ AuthService.getCurrentUser()})
    }

    const approveOrder = (id,status) => {
        fetch(`https://gariunaicloud.azurewebsites.net/api/Orders/${id}/status?status=${status}`, {
            method: 'POST',
            headers: {
                'Authorization':'bearer '+ AuthService.getCurrentUser()
            }
        }).then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
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
                await fetch("https://gariunaicloud.azurewebsites.net/api/Listings/"+element.listingId)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        element['listing'] = data
                    })
              })
              setTimeout(() => {
                  if(which == "orderHistory"){
                      setOrderHistory(data)
                      console.log(data)
                  }else{
                      setListingHistory(data)
                      console.log(data)
                  }
              }, 800);
            
          })
      } 
    
    const handleHistory= async (which)=>{
        await fetchOrderHistory(which)
      }
    
    useEffect(() => {
        if(!isPageLoaded){xw
            setIsLoaded(true);
        }
    }, []);
    
    useEffect(() => {
        const getData= async () => {
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
      <Tab eventKey="orderHistory" title="Order history" >
          Order history:
          {orderHistory.length > 0 && (
                <ListGroup>
              {orderHistory.map((order,index) => (
                  <ListGroup.Item key={index} >{order.price} | Item: {order.listing.title}</ListGroup.Item>
              ))}
              </ListGroup>

          )}

      </Tab>
      <Tab eventKey="listingHistory" title="Listing history">
          Listing history:
          {listingHistory.length > 0 && (
            <ListGroup>
                {listingHistory.map((order,index) => (
                    <ListGroup.Item key={index}> Status: {order.status} | Item: {order.listing.title}  | price: {order.price}  | Placer Name: {order.placerUsername}
                    <Button variant="success" onClick={approveOrder(order.listingId, "Confirmed")}>Approve</Button> <Button variant="danger">Cancel</Button>
                     </ListGroup.Item>
                ))}
            </ListGroup>
          )}
      </Tab>
      </Tabs>

    return (
        <Container>
        <div>
            Hello
            {tabMenu}
        
        
        </div>
        </Container>
    )
}

export default OrderHistory