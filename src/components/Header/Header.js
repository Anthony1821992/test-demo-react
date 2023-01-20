import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">Hoi Dan IT</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            Hoi Dan IT
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            </Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
