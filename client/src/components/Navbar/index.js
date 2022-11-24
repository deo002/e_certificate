import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../contexts/AuthContext';

function NavigationBar() {

  const { signout, currentUser } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Digital Certificates Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#instructions">Instructions</Nav.Link>
          </Nav>
          { currentUser ? 
              <Nav>
                <Nav.Link href="#log-out" onClick={signout} >Sign Out</Nav.Link>
              </Nav>
                  :
              <Nav>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Sign In</Nav.Link>
              </Nav>
          }
          <Nav>
            <Nav.Link href="#connect-wallet">Connect Wallet</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;