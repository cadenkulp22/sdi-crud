import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cookie from 'cookie';
import { useState } from "react";
import EditCard from "./EditCard";
import './ItemCard.css';

const ItemCard = ({ item, callback }) => {

  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.stopPropagation();
    setEditing(true);
  }

  const handleSubmitEdits = () => {
    setEditing(false);
    callback();
  }

  const handleDelete = (event) => {
    event.stopPropagation();

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
        callback();
      })
      .catch(err => console.log(err));
  }

  const truncateText = (text) => {
    const maxLength = 100;
    return text.length > maxLength ? (text.slice(0, maxLength) + '...') : text;
  }

  return (
    <>
    {editing ? <EditCard item={item} callback={handleSubmitEdits} /> :
    <Card className="item-card" onClick={() => navigate(`/${item.id}`, { state: item })}>
      <Card.Body>
        <Card.Title>{item.item_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{truncateText(item.description)}</Card.Subtitle>
        <Badge pill bg="secondary" className="mb-2">Quantity: {item.quantity}</Badge>
        {(cookie.parse(document.cookie)).loggedIn && ((cookie.parse(document.cookie)).userId === item.user_id.toString()) ?
          <>
            <br />
            <Button variant="primary" className="me-2" onClick={handleEdit}>Edit</Button>
            <Button variant="primary" onClick={handleDelete}>Delete</Button>
          </> : null}
      </Card.Body>
    </Card>
    }
    </>
    
  )
}

export default ItemCard;