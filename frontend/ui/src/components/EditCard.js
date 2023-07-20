import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const EditCard = ({ item, callback }) => {

  const [nameInput, setNameInput] = useState(item.item_name);
  const [descriptionInput, setDescriptionInput] = useState(item.description);
  const [quantityInput, setQuantityInput] = useState(item.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newData = {
      item_name: nameInput,
      description: descriptionInput,
      quantity: quantityInput
    }

    let url = `http://localhost:3001/inventory/${item.id}`;
    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    };

    fetch(url, options)
      .then(res => {
        console.log(res);
        callback();
      })
      .catch(err => console.log(err));

    // callback();
  }
  
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" onChange={e => setNameInput(e.target.value)} value={nameInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Item Description</Form.Label>
            <Form.Control type="text" placeholder="Item description" onChange={e => setDescriptionInput(e.target.value)} value={descriptionInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control type="number" onChange={e => setQuantityInput(e.target.value)} value={quantityInput} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCard;