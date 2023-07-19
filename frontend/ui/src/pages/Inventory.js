import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Container, Row, Col } from 'react-bootstrap';
import cookie from 'cookie';

const Inventory = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    if ((cookie.parse(document.cookie)).loggedIn) {
      let url = `http://localhost:3001/inventory?userId=${(cookie.parse(document.cookie)).userId}`;
      console.log(url);
    }
  })

  return (
    <>
      <Navigation />
      <Container>
        <h1>My Inventory</h1>
        <Row>
          <Col>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Inventory;