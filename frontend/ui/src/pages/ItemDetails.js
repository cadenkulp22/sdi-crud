import { useState, useEffect } from "react";
import { Container, Card, Badge, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import cookie from 'cookie';
import EditCard from "../components/EditCard";

const ItemDetails = () => {

  const navigate = useNavigate();

  const location = useLocation();
  // let item = location.state;

  const [item, setItem] = useState(location.state);
  const [createdBy, setCreatedBy] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        let filteredUser = data.filter(user => user.id === item.user_id);
        let firstLast = `${filteredUser[0].first_name} ${filteredUser[0].last_name}`;
        setCreatedBy(firstLast);
      })
  }, [item.user_id]);

  const handleEdit = () => {
    setEditing(true);
  }

  const handleSubmitEdits = () => {
    setEditing(false);
    fetch('http://localhost:3001/inventory')
      .then(res => res.json())
      .then(items => {
        let itemArray = items.filter(currItem => currItem.id === item.id);
        setItem(itemArray[0]);
      })
  }

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
        {editing ? <EditCard item={item} callback={handleSubmitEdits} /> :
        <Card>
          <Card.Body>
            <Card.Title>{item.item_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
            <Badge pill bg="secondary" className="me-2 mb-2">Quantity: {item.quantity}</Badge>
            <Badge pill bg="secondary">Created By: {createdBy}</Badge>
            {(cookie.parse(document.cookie)).loggedIn && ((cookie.parse(document.cookie)).userId === item.user_id.toString()) ?
              <>
                <br />
                <Button variant="primary" className="me-2" onClick={handleEdit}>Edit</Button>
                <Button variant="primary" onClick={handleDelete}>Delete</Button>
              </> : null}
          </Card.Body>
        </Card>
        }
      </Container>
    </>
  );
}

export default ItemDetails;