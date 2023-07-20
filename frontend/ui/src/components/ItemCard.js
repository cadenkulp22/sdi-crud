import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cookie from 'cookie';

const ItemCard = ({ item, callback }) => {

  const navigate = useNavigate();

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

  return (
    <Card onClick={() => navigate(`/${item.id}`, { state: item })}>
      <Card.Body>
        <Card.Title>{item.item_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
        <Badge pill bg="secondary" className="mb-2">Quantity: {item.quantity}</Badge>
        {(cookie.parse(document.cookie)).loggedIn ?
          <>
            <br />
            <Button variant="primary" className="me-2">Edit</Button>
            <Button variant="primary" onClick={handleDelete}>Delete</Button>
          </> : null}
      </Card.Body>
    </Card>
  )
}

export default ItemCard;