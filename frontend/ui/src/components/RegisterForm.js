import { Form, Row, Col, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First" />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last" />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
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