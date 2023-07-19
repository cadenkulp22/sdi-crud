import { useEffect } from "react";
import { Nav } from "react-bootstrap";

const Logout = () => {

  useEffect(() => {
    document.cookie = `loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }, [])

  return (
    <>
      <h1>You are now logged out</h1>
      <Nav.Link href="/">Go Back Home</Nav.Link>
    </>
  )
}

export default Logout;