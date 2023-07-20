import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import cookie from 'cookie';
import { useNavigate } from "react-router-dom";

const AddItem = () => {

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription]  = useState('');
  const [itemQuantity, setItemQuantity]  = useState('');

  const navigate = useNavigate();

  const handleAddItem = (e) => {
    e.preventDefault();

    let newItemObj = {
      user_id: (cookie.parse(document.cookie)).userId,
      item_name: itemName,
      description: itemDescription,
      quantity: itemQuantity
    };

    let newItemOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItemObj)
    };

    fetch('http://localhost:3001/inventory', newItemOptions)
      .then(res => res.json())
      .then(data => {
        console.log('item added', data)
        navigate('/', { replace: false })
      })
      .catch(err  => console.log(err));
  }

  return (
    <>
    {(cookie.parse(document.cookie)).loggedIn ? 
    <Container className="mt-5">
      <Form onSubmit={handleAddItem}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" placeholder="Item name" onChange={e => setItemName(e.target.value)} value={itemName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Item Description</Form.Label>
          <Form.Control type="text" placeholder="Item description" onChange={e => setItemDescription(e.target.value)} value={itemDescription} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQuantity">
          <Form.Label>Item Quantity</Form.Label>
          <Form.Control type="number" onChange={e => setItemQuantity(e.target.value)} value={itemQuantity} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </Container> :
    <h1>You do not have access to this  page!</h1>}
    </>
    
  );
}

export default AddItem;