import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange }) => {

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
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