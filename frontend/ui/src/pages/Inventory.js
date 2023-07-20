import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Container, Row, Col, Button } from 'react-bootstrap';
import cookie from 'cookie';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom';

const Inventory = () => {

  console.log('render')

  const [items, setItems] = useState([]);
  const [viewingAllItems, setViewingAllItems] = useState(false);

  useEffect(() => {
    let url = '';
    if ((cookie.parse(document.cookie)).loggedIn) {
      if (viewingAllItems) {
        url = `http://localhost:3001/inventory`;
      } else {
        url = `http://localhost:3001/inventory?userId=${(cookie.parse(document.cookie)).userId}`;
      }
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setItems(data)
        })
    } else {
      url = `http://localhost:3001/inventory`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setItems(data)
        })
    }
  }, [viewingAllItems]);

  return (
    <>
      <Navigation />
      <Container className='mt-4'>
        {
          (cookie.parse(document.cookie)).loggedIn ?
            viewingAllItems ? 
              <>
                <h1>All Items</h1>
                <Link to='/add-item' className='me-3'><Button>Add Item</Button></Link>
                <Button onClick={() => setViewingAllItems(false)}>View My Items</Button>
              </>
              :
              <>
                <h1>My Items</h1>
                <Link to='/add-item' className='me-3'><Button>Add Item</Button></Link>
                <Button onClick={() => setViewingAllItems(true)}>View All Items</Button>
              </>
            : <h1>All Items</h1>
        }
        <Row className='row-cols-4 mt-4'>
          {items.length > 0 ?
            items.map(item => <Col key={item.id}><ItemCard item={item}/></Col>) :
            <h1>You do not have any items</h1>}
        </Row>
      </Container>
    </>
  );
}

export default Inventory;