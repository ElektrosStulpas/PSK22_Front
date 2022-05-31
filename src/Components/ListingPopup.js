import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import React, { useEffect, useState } from "react"
import axios from "axios";
import authHeader from "../services/auth-header";
import AuthService from '../services/auth.service';
const API_URL = `https://gariunaicloud.azurewebsites.net/api`

export function ListingPopup(props) {

    const [selectedDayRange, setDayRange] = useState({ from: null, to: null })
    const [unavailableDates, setUnavailableDates] = useState(null)
    const [orderSuccessful, setOrderSuccessful] = useState(null)

    const fetchUnavailableDates = () => {
        const date = new Date()
        const startDate = date.toISOString().slice(0, 10)
        const endDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()).toISOString().slice(0, 10)
        axios
            .get(API_URL + `/listings/${props.listing.listingId}/availability?startDate=${startDate}&endDate=${endDate}`)
            .then(response => {
                const dates = response.data.map(date => {
                    const tmp = {
                        day: parseInt(date.split('-')[2]),
                        month: parseInt(date.split('-')[1]),
                        year: parseInt(date.split('-')[0])
                    }
                    return tmp
                })
                setUnavailableDates(dates)
            })

    }
    const postOrder = () => {
        const payload = {
            startDate: calendarToDate(selectedDayRange.from).toISOString(),
            endDate: calendarToDate(selectedDayRange.to).toISOString(),
            listingId: props.listing.listingId
        }
        axios
            .post(API_URL + "/Orders", payload, { headers: authHeader() })
            .then(response => {
                setOrderSuccessful(true)
                setSelectedDayRange({ from: null, to: null })
            })
            .catch(error => {
                setOrderSuccessful(false)
            })

    }

    useEffect(() => {
        fetchUnavailableDates()
    }, [setDayRange])

    const getToday = () => {
        const today = new Date()
        const date = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        }
        return date
    }
    const setSelectedDayRange = (range) => {
        setDayRange(range)
    }
    const isValidDateChosen = () => {
        return selectedDayRange.from != null && selectedDayRange.to != null
    }
    const formatDate = (date) => {
        return calendarToDate(date).toLocaleDateString("lt-LT")
    }
    const calendarToDate = (calendarDate) => {
        return new Date(calendarDate.year, calendarDate.month, calendarDate.day)
    }
    const getTotalPrice = () => {
        if (isValidDateChosen()) {
            const duration =
                (calendarToDate(selectedDayRange.to) - calendarToDate(selectedDayRange.from)) / (1000 * 60 * 60 * 24)
            return props.listing.daysPrice * duration
        }
    }
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            placeholder="Choose date range"
            value={
                isValidDateChosen()
                    ? `${formatDate(selectedDayRange.from)}; ${formatDate(selectedDayRange.to)}`
                    : ""
            }
            style={{
                textAlign: 'center',
                fontSize: '1rem',
                border: '1px solid ',
                borderRadius: '5px',
                color: 'grey',
                outline: 'none',
                padding: "0.375rem 0.75rem"
            }}
        />
    )
    const getAlert = () => {
        if (orderSuccessful == null) {
            return
        }

        return orderSuccessful
            ? <Alert className='mb-0' variant="success">Order request sent!</Alert>
            : <Alert className='mb-0' variant="danger">Failed to process order!</Alert>
    }

    return (
        <Modal {...props} size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.listing.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Image src={props.image} className='img-fluid mx-auto d-block' style={{ "max-height": "18rem" }} />
                <p><b>City: </b>{props.listing.city}</p>
                <p><b>Description: </b>{props.listing.description}</p>
                <p><b>Price: </b>{props.listing.daysPrice}€ / day</p>
                <p><b>Deposit: </b>{props.listing.deposit}€</p>

            </Modal.Body>

            {
                AuthService.isAuthenticated() ?
                    <Modal.Footer>
                        <DatePicker
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            inputPlaceholder="Select date range"
                            shouldHighlightWeekends
                            renderInput={renderCustomInput}
                            colorPrimary="#0d6efd"
                            colorPrimaryLight="rgb(13, 110, 253, 0.2)"
                            minimumDate={getToday()}
                            disabledDays={unavailableDates}
                        />
                        <Button disabled={!isValidDateChosen()} onClick={postOrder}>
                            Place an order {isValidDateChosen() ? `(${getTotalPrice()}€)` : ''}
                        </Button>
                    </Modal.Footer>
                    :
                    <Modal.Footer>
                        <Button disabled={!isValidDateChosen()}>
                            Login to order
                        </Button>
                    </Modal.Footer>
            }



            {getAlert()}
        </Modal>

    );
}
