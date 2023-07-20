import { useState, useEffect } from "react";
import { Container, Card, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

const ItemDetails = () => {

  const location = useLocation();
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

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>{item.item_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
            <Badge pill bg="secondary" className="me-2">Quantity: {item.quantity}</Badge>
            <Badge pill bg="secondary">Created By: {createdBy}</Badge>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ItemDetails;