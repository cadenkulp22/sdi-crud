import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'cookie';
import { useEffect, useState } from 'react';

const Navigation = () => {

  const [name, setName] = useState('');

  useEffect(() => {
    if ((cookie.parse(document.cookie)).loggedIn) {
      fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        let filteredUser = data.filter(user => user.id.toString() === (cookie.parse(document.cookie)).userId);
        setName(filteredUser[0].first_name);
      })
    }
  }, [])

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to='/' className='me-3'>Inventory</Link>
          {(cookie.parse(document.cookie)).loggedIn ? 
            <Link to='/logout' className='me-3'>Logout</Link> :
            <Link to='/login' className='me-3'>Login</Link>}
        </Nav>
        {(cookie.parse(document.cookie)).loggedIn ? <h5 className='text-light'>Welcome {name}</h5> : null}
      </Container>
    </Navbar>
  )
}

export default Navigation;