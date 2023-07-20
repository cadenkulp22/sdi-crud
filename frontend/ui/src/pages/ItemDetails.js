import { useState, useEffect } from "react";
import { Container, Card, Badge, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import cookie from 'cookie';

const ItemDetails = () => {

  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location.state);
  let item = location.state;

  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        let filteredUser = data.filter(user => user.id === item.user_id);
        let firstLast = `${filteredUser[0].first_name} ${filteredUser[0].last_name}`;
        setCreatedBy(firstLast);
      })
  }, [item.user_id]);

  const handleDelete = () => {

    let url = `http://localhost:3001/inventory/${item.id}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(res => {
        console.log('item deleted');
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>{item.item_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
            <Badge pill bg="secondary" className="me-2 mb-2">Quantity: {item.quantity}</Badge>
            <Badge pill bg="secondary">Created By: {createdBy}</Badge>
            {(cookie.parse(document.cookie)).loggedIn ?
              <>
                <br />
                <Button variant="primary" className="me-2">Edit</Button>
                <Button variant="primary" onClick={handleDelete}>Delete</Button>
              </> : null}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ItemDetails;