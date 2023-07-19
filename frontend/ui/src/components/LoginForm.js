import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleChange }) => {

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let enteredCreds = {
      username: usernameInput,
      password: passwordInput
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enteredCreds)
    };

    fetch('http://localhost:3001/users/login', options)
      .then(res => {
        console.log(res)
        return res.json();
      })
      .then(data => {
        console.log('VAL', data);
        document.cookie = `loggedIn=${data}`;
        navigate('/', { replace: false })
      })
      .catch(err  => console.log(err));
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