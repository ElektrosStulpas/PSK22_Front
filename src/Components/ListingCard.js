import axios from "axios";
import React, { useEffect, useState } from "react"
import { Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ListingCard = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const loadingGif = process.env.PUBLIC_URL + '/loading.gif'
    const defaultImage = process.env.PUBLIC_URL + '/no_image.png'
    const realImageUrl = `http://gariunaicloud.azurewebsites.net/api/Listings/${props.listing.listingId}/image`
    const [imageUrl, setImageUrl] = useState(loadingGif)

    const checkImage = () => {
        axios
            .get(realImageUrl)
            .then(_ => setImageUrl(realImageUrl), _ => setImageUrl(defaultImage))
    }

    useEffect(() => {
        // checkImage()
    }, [])

    function calcPrice(dayPrice, days) {
        return dayPrice * days
    }
    function ListingPopup(props) {
        return (
          <Modal {...props} size="lg">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {props.listing.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/**@TODO fix image cuz it's not working **/}
                {/* <img>src={props.image} </img> */}
                <p>{props.listing.description}</p>
                <p>{props.listing.daysPrice}€ / day</p>
            </Modal.Body>
            <Modal.Footer>
              {/** @TODO make this nicer cuz it looks uggo **/}
              <p class="text-left">{props.city}</p>
              <Button>Rent</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div>
        <ListingPopup image = {imageUrl} listing = {props.listing} show={modalShow} onHide={() => setModalShow(false)} />
            <div onClick={() => setModalShow(true)}>
                <Card style={{ width: '18rem', height: '100%' }}>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title style={{ textAlign: 'center' }}>{props.listing.title}</Card.Title>
                        <Card.Img style={{ 'objectFit': 'scale-down', 'height': '15rem' }} variant="top" src={imageUrl} />
                        {/* <Card.Text disabled>{listing.description}</Card.Text> */}
                        <Card.Subtitle className="mb-3 daysPrice" >{props.listing.daysPrice}€ / day</Card.Subtitle>
                        <Card.Subtitle className="mb-3 totalPrice" >Total: {calcPrice(props.listing.daysPrice, props.days).toFixed(2)}€</Card.Subtitle>
                        <Card.Subtitle className="mb-0 city">City: {props.listing.city}</Card.Subtitle> 
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
