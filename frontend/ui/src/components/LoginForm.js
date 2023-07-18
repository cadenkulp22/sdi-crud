import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange }) => {

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    // setCreds to user entered creds
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange={e => setUsernameInput(e.target.value)} value={usernameInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPasswordInput(e.target.value)} value={passwordInput} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <div className='d-flex mt-3'>
        <h5>Don't have an account?</h5>
        <h5 onClick={handleChange} className='ms-2'>Register Here</h5>
      </div>
    </Form>
  );
}

export default LoginForm;