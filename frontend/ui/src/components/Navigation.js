import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'cookie';

const Navigation = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to='/' className='me-3'>Inventory</Link>
          {(cookie.parse(document.cookie)).loggedIn ? 
            <Link to='/logout' className='me-3'>Logout</Link> :
            <Link to='/login' className='me-3'>Login</Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation;