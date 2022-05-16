import { useNavigate } from "react-router-dom";
import { Form, Button, Image } from 'react-bootstrap';

const ListingForm = (props) => {

    const { handleSubmit, imageState, listingState } = props
    const [image, setImage] = imageState

    var navigate = useNavigate();

    const imagePreview = () => {
        return image ? <Image src={URL.createObjectURL(image)} className='img-fluid mx-auto d-block' style={{ "max-height": "18rem" }} /> : <div />
    }

    return (
        <Form onSubmit={e => { e.preventDefault(); handleSubmit(e.target) }}>
            <Form.Group className="mb-1">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    name="title"
                    id="title"
                    defaultValue={listingState ? listingState.title : ""}
                    required />
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    id="city"
                    defaultValue={listingState ? listingState.city : ""}
                    required />
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label htmlFor="daysPrice">Price/day</Form.Label>
                <Form.Control
                    type="number"
                    name="daysPrice"
                    id="daysPrice"
                    defaultValue={listingState ? listingState.daysPrice : ""}
                    required />
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label htmlFor="deposit">Deposit</Form.Label>
                <Form.Control
                    type="number"
                    name="deposit"
                    id="deposit"
                    defaultValue={listingState ? listingState.deposit : ""}
                    required />
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    name="description"
                    id="description"
                    as="textarea"
                    defaultValue={listingState ? listingState.description : ""}
                    required />
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
    )
}

export default ListingForm;