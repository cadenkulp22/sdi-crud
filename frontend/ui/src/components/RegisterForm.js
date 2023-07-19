import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ handleChange }) => {

  const [firstInput, setFirstInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let newUser = {
      first_name: firstInput,
      last_name: lastInput,
      username: usernameInput,
      password: passwordInput
    }
    console.log(newUser);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };
    fetch('http://localhost:3001/users', options)
      .then(res => {
        if (res.status === 201) {
          console.log('user added');
          let newCreds = {
            username: usernameInput,
            password: passwordInput
          };
          const newUserOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCreds)
          };
          fetch('http://localhost:3001/users/login', newUserOptions)
            .then(res => res.json())
            .then(data => {
              console.log('VAL', data);
              document.cookie = `loggedIn=${data}`;
              navigate('/', { replace: false })
            })
            .catch(err  => console.log(err));
        } else {
          console.log('error adding user')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handleRegister}>
        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='formFirst'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First" onChange={e => setFirstInput(e.target.value)} value={firstInput} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='formLast'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last" onChange={e => setLastInput(e.target.value)} value={lastInput} />
            </Form.Group>
          </Col>
        </Row>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange={e => setUsernameInput(e.target.value)} value={usernameInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPasswordInput(e.target.value)} value={passwordInput} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      <div className='d-flex mt-3'>
        <h5>Already have an account?</h5>
        <h5 onClick={handleChange} className='ms-2'>Login Here</h5>
      </div>
    </Form>
  );
}

export default RegisterForm;