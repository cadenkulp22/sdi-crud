import { useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegisterForm";

const Registration = () => {

  const [login, setLogin] = useState(true);

  const handleChangeToRegister = () => {
    setLogin(false);
  }

  const handleChangeToLogin = () => {
    setLogin(true);
  }

  return (
    <Container className="mt-5">
      {login ? 
        <LoginForm handleChange={handleChangeToRegister} /> : 
        <RegistrationForm handleChange={handleChangeToLogin} />}
    </Container>
  );
}

export default Registration;